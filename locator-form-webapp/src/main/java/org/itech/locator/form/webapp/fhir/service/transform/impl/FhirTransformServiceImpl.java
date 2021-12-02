package org.itech.locator.form.webapp.fhir.service.transform.impl;

import java.security.NoSuchAlgorithmException;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.hl7.fhir.r4.model.Address;
import org.hl7.fhir.r4.model.Address.AddressType;
import org.hl7.fhir.r4.model.Address.AddressUse;
import org.hl7.fhir.r4.model.BooleanType;
import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Bundle.BundleEntryComponent;
import org.hl7.fhir.r4.model.Bundle.BundleType;
import org.hl7.fhir.r4.model.Bundle.HTTPVerb;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.Coding;
import org.hl7.fhir.r4.model.ContactPoint.ContactPointSystem;
import org.hl7.fhir.r4.model.Enumerations.AdministrativeGender;
import org.hl7.fhir.r4.model.HumanName;
import org.hl7.fhir.r4.model.Identifier;
import org.hl7.fhir.r4.model.Patient;
import org.hl7.fhir.r4.model.Patient.ContactComponent;
import org.hl7.fhir.r4.model.Questionnaire;
import org.hl7.fhir.r4.model.Questionnaire.QuestionnaireItemComponent;
import org.hl7.fhir.r4.model.Questionnaire.QuestionnaireItemType;
import org.hl7.fhir.r4.model.QuestionnaireResponse;
import org.hl7.fhir.r4.model.QuestionnaireResponse.QuestionnaireResponseItemAnswerComponent;
import org.hl7.fhir.r4.model.QuestionnaireResponse.QuestionnaireResponseItemComponent;
import org.hl7.fhir.r4.model.QuestionnaireResponse.QuestionnaireResponseStatus;
import org.hl7.fhir.r4.model.Reference;
import org.hl7.fhir.r4.model.Resource;
import org.hl7.fhir.r4.model.ResourceType;
import org.hl7.fhir.r4.model.ServiceRequest;
import org.hl7.fhir.r4.model.Specimen;
import org.hl7.fhir.r4.model.Specimen.SpecimenStatus;
import org.hl7.fhir.r4.model.StringType;
import org.hl7.fhir.r4.model.Task;
import org.hl7.fhir.r4.model.Task.TaskRestrictionComponent;
import org.hl7.fhir.r4.model.Task.TaskStatus;
import org.itech.locator.form.webapp.api.LocatorFormUtil;
import org.itech.locator.form.webapp.api.dto.HealthDeskDTO;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.api.dto.Traveller;
import org.itech.locator.form.webapp.fhir.service.FhirConstants;
import org.itech.locator.form.webapp.fhir.service.transform.FhirTransformService;
import org.itech.locator.form.webapp.security.SecurityUtil;
import org.itech.locator.form.webapp.summary.LabelContentPair;
import org.itech.locator.form.webapp.summary.security.SummaryAccessInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FhirTransformServiceImpl implements FhirTransformService {

	@Value("${org.itech.locator.form.loinccodes}")
	private String[] loincCodes;

	@Value("${org.itech.locator.form.filler.id}")
	private String fillerId; // the Organization that Tasks are being referred to

	@Value("${org.itech.locator.form.orderer.id}")
	private String ordererId; // the Organization that Tasks are being sent from

	@Value("${org.itech.locator.form.requester.person.id}")
	private String requesterId; // the Practitioner that Tasks are requested by

	@Value("${org.itech.locator.form.location.id}")
	private String locationId; // the Location that ServiceRequests are coming from

	@Value("${org.itech.locator.form.barcodelength:36}")
	private Integer barcodeLength;

	@Value("${org.openelisglobal.oe.fhir.system:http://openelis-global.org}")
	private String oeFhirSystem;

	@Value("${org.itech.locator.form.fhir.system:https://host.openelis.org/locator-form}")
	private String locatorFormFhirSystem;

	@Value("${org.itech.locator.form.fhir.system.test-kit:https://host.openelis.org/locator-form/test-kit}")
	private String testKitIdSystem;

	@Value("${org.itech.locator.form.questionnaire.id}")
	private String questionnaireId;

	private ObjectMapper objectMapper;

	public FhirTransformServiceImpl(ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
	}

	@Override
	public TransactionObjects createTransactionObjects(LocatorFormDTO locatorFormDTO, boolean assignIds,
			TaskStatus status) throws JsonProcessingException {
		TransactionObjects transactionInfo = new TransactionObjects();
		Bundle transactionBundle = new Bundle();
		transactionBundle.setType(BundleType.TRANSACTION);
		transactionInfo.bundle = transactionBundle;

		if (assignIds) {
			locatorFormDTO.setTaskId(UUID.randomUUID().toString());
			locatorFormDTO.setSubTaskId(UUID.randomUUID().toString());
			locatorFormDTO.setServiceRequestId(UUID.randomUUID().toString());
			locatorFormDTO.setPatientId(UUID.randomUUID().toString());
			locatorFormDTO.setSpecimenId(UUID.randomUUID().toString());
			locatorFormDTO.setQuestionnaireResponseId(UUID.randomUUID().toString());
		}

		Task fhirTask = createFhirTask(locatorFormDTO, status);
		transactionBundle.addEntry(createTransactionBundleComponent(fhirTask));
		transactionInfo.task = fhirTask;

		ServiceRequestObjects fhirServiceRequestPatient = createFhirServiceRequestPatient(locatorFormDTO,
				locatorFormDTO, status);
		addServiceRequestPatientPairToTransaction(fhirServiceRequestPatient, transactionInfo);

		QuestionnaireResponse questionnaireResponse = createQuestionareResponse(locatorFormDTO, status);
		transactionBundle.addEntry(createTransactionBundleComponent(questionnaireResponse));
		transactionInfo.questionnaireResponse = questionnaireResponse;

		for (Traveller comp : locatorFormDTO.getFamilyTravelCompanions()) {
			if (assignIds) {
				comp.setServiceRequestId(UUID.randomUUID().toString());
				comp.setPatientId(UUID.randomUUID().toString());
				comp.setSubTaskId(UUID.randomUUID().toString());
				comp.setSpecimenId(UUID.randomUUID().toString());
			}
			fhirServiceRequestPatient = createFhirServiceRequestPatient(locatorFormDTO, comp, status);
			addServiceRequestPatientPairToTransaction(fhirServiceRequestPatient, transactionInfo);

			questionnaireResponse = createQuestionareResponse(locatorFormDTO, status);
			transactionBundle.addEntry(createTransactionBundleComponent(questionnaireResponse));
		}

		for (Traveller comp : locatorFormDTO.getNonFamilyTravelCompanions()) {
			if (assignIds) {
				comp.setServiceRequestId(UUID.randomUUID().toString());
				comp.setPatientId(UUID.randomUUID().toString());
				comp.setSubTaskId(UUID.randomUUID().toString());
				comp.setSpecimenId(UUID.randomUUID().toString());
			}
			fhirServiceRequestPatient = createFhirServiceRequestPatient(locatorFormDTO, comp, status);
			addServiceRequestPatientPairToTransaction(fhirServiceRequestPatient, transactionInfo);

			questionnaireResponse = createQuestionareResponse(locatorFormDTO, status);
			transactionBundle.addEntry(createTransactionBundleComponent(questionnaireResponse));
		}

//		if (transactionInfo.serviceRequestPatientPairs.size() == 1) {
//			transactionInfo.task = transactionInfo.serviceRequestPatientPairs.get(0).task;
//			transactionInfo.task.setPartOf(null);
//		}

		// locatorFormDTO added at end so that any updated values (like
		// serviceRequestId) get added to the
		for (ServiceRequestObjects curServiceRequestObjects : transactionInfo.serviceRequestPatientPairs) {
			curServiceRequestObjects.task.setDescription(objectMapper.writeValueAsString(locatorFormDTO));
		}

		return transactionInfo;
	}

	private Task createFhirTask(LocatorFormDTO locatorFormDTO, TaskStatus status) {
		Task fhirTask = new Task();
		String taskId = locatorFormDTO.getTaskId();
		if (StringUtils.isBlank(taskId)) {
			taskId = UUID.randomUUID().toString();
		}
		fhirTask.setId(taskId);
		locatorFormDTO.setTaskId(taskId);

		fhirTask.setRequester(new Reference(requesterId));

		return fhirTask;
	}

	private void addServiceRequestPatientPairToTransaction(ServiceRequestObjects fhirServiceRequestPatient,
			TransactionObjects transactionInfo) {
		transactionInfo.bundle.addEntry(createTransactionBundleComponent(fhirServiceRequestPatient.serviceRequest));
		transactionInfo.bundle.addEntry(createTransactionBundleComponent(fhirServiceRequestPatient.task));
		transactionInfo.bundle.addEntry(createTransactionBundleComponent(fhirServiceRequestPatient.patient));
		transactionInfo.bundle.addEntry(createTransactionBundleComponent(fhirServiceRequestPatient.specimen));

		fhirServiceRequestPatient.task
				.addPartOf(new Reference(ResourceType.Task + "/" + transactionInfo.task.getIdElement().getIdPart()));
		transactionInfo.serviceRequestPatientPairs.add(fhirServiceRequestPatient);
	}

	private BundleEntryComponent createTransactionBundleComponent(Resource fhirResource) {
		ResourceType resourceType = fhirResource.getResourceType();
		String sourceResourceId = fhirResource.getIdElement().getIdPart();
		if (StringUtils.isNumeric(sourceResourceId)) {
			throw new IllegalArgumentException("id cannot be a number. Numbers are reserved for local entities only");
		}

		BundleEntryComponent transactionComponent = new BundleEntryComponent();
		transactionComponent.setResource(fhirResource);

		transactionComponent.getRequest().setMethod(HTTPVerb.PUT);
		transactionComponent.getRequest().setUrl(resourceType + "/" + sourceResourceId);

		return transactionComponent;
	}

	private Task createSubFhirTask(LocatorFormDTO locatorFormDTO, Traveller comp, TaskStatus status) {
		Task fhirTask = new Task();
		String taskId = comp.getSubTaskId();
		if (StringUtils.isBlank(taskId)) {
			taskId = UUID.randomUUID().toString();
		}
		fhirTask.setId(taskId);
		comp.setSubTaskId(taskId);

		Identifier identifier = new Identifier();
		identifier.setId(taskId);
		identifier.setSystem(locatorFormFhirSystem);
		fhirTask.setStatus(status);
		List<Identifier> identifierList = new ArrayList<>();
		identifierList.add(identifier);

		fhirTask.setIdentifier(identifierList);
		fhirTask.setAuthoredOn(new Date());
		fhirTask.setRequester(new Reference(requesterId));
		fhirTask.setOwner(new Reference(fillerId));
		fhirTask.setRestriction(new TaskRestrictionComponent().addRecipient(new Reference(ordererId)));

		return fhirTask;
	}

	private ServiceRequestObjects createFhirServiceRequestPatient(LocatorFormDTO locatorFormDTO, Traveller comp,
			TaskStatus status) {
		// patient is created here and used for SR subjectRef
		Patient fhirPatient = createFhirPatient(locatorFormDTO, comp);
		// patient is created here and used for SR subjectRef
		Specimen specimen = createSpecimen(locatorFormDTO, comp);
		// patient is created here and used for SR subjectRef
		Task task = createSubFhirTask(locatorFormDTO, comp, status);

		ServiceRequest serviceRequest = new ServiceRequest();
		String serviceRequestId = comp.getServiceRequestId();
		if (StringUtils.isBlank(serviceRequestId)) {
			serviceRequestId = UUID.randomUUID().toString();
		}
		serviceRequest.setId(serviceRequestId);
		serviceRequest.addIdentifier(new Identifier().setSystem(locatorFormFhirSystem).setValue(serviceRequestId));
		comp.setServiceRequestId(serviceRequestId);

		if (locatorFormDTO instanceof HealthDeskDTO) {
			HealthDeskDTO healthDeskDto = (HealthDeskDTO) locatorFormDTO;
			if (StringUtils.isNotBlank(healthDeskDto.getTestKitId())) {
				serviceRequest.addIdentifier(
						new Identifier().setSystem(testKitIdSystem).setValue(healthDeskDto.getTestKitId()));
			}
		}

		CodeableConcept codeableConcept = new CodeableConcept();
		for (String loincCode : loincCodes) {
			codeableConcept.addCoding(new Coding().setCode(loincCode).setSystem("http://loinc.org"));
		}
		serviceRequest.setCode(codeableConcept);

		serviceRequest.setSubject(new Reference(ResourceType.Patient + "/" + fhirPatient.getIdElement().getIdPart()));
		serviceRequest.addSpecimen(new Reference(ResourceType.Specimen + "/" + specimen.getIdElement().getIdPart()));
		serviceRequest.setRequester(new Reference(requesterId));
		serviceRequest.addLocationReference(new Reference(locationId));
		serviceRequest.setAuthoredOn(new Date());

		specimen.addRequest(
				new Reference(ResourceType.ServiceRequest + "/" + serviceRequest.getIdElement().getIdPart()));

		task.addBasedOn(new Reference(ResourceType.ServiceRequest + "/" + serviceRequest.getIdElement().getIdPart()));
		return new ServiceRequestObjects(task, serviceRequest, fhirPatient, specimen);

	}

	private Specimen createSpecimen(LocatorFormDTO locatorFormDTO, Traveller comp) {
		Specimen specimen = new Specimen();
		String specimenId = comp.getSpecimenId();
		if (StringUtils.isBlank(specimenId)) {
			specimenId = UUID.randomUUID().toString();
		}
		specimen.setId(specimenId);
		comp.setSpecimenId(specimenId);

		specimen.setReceivedTime(new Date());
		specimen.setType(new CodeableConcept());
		specimen.setStatus(SpecimenStatus.AVAILABLE);

		return specimen;
	}

	private Patient createFhirPatient(LocatorFormDTO locatorFormDTO, Traveller comp) {
		Patient fhirPatient = new Patient();
		String patientId = comp.getPatientId();
		if (StringUtils.isBlank(patientId)) {
			patientId = UUID.randomUUID().toString();
		}
		fhirPatient.setId(patientId);
		comp.setPatientId(patientId);

		HumanName humanName = new HumanName();
		List<HumanName> humanNameList = new ArrayList<>();
		humanName.setFamily(comp.getLastName());
		humanName.addGiven(comp.getFirstName());
		humanNameList.add(humanName);
		fhirPatient.setName(humanNameList);

		fhirPatient.addIdentifier(new Identifier().setSystem(oeFhirSystem + "/pat_guid").setValue(patientId));
		fhirPatient.addIdentifier(
				(Identifier) new Identifier().setSystem(locatorFormFhirSystem).setValue(patientId).setId(patientId));
		fhirPatient.addIdentifier((Identifier) new Identifier().setSystem("passport").setValue(comp.getPassportNumber())
				.setId(comp.getPassportNumber()));

		if (!StringUtils.isAllBlank(locatorFormDTO.getNationalID()) && comp == locatorFormDTO) {
			fhirPatient.addIdentifier((Identifier) new Identifier().setSystem("http://govmu.org")
					.setValue(locatorFormDTO.getNationalID()).setId(locatorFormDTO.getNationalID()));
		}

		fhirPatient.setBirthDate(Date.from(comp.getDateOfBirth().atStartOfDay(ZoneId.systemDefault()).toInstant()));
		switch (comp.getSex()) {
		case MALE:
			fhirPatient.setGender(AdministrativeGender.MALE);
			break;
		case FEMALE:
			fhirPatient.setGender(AdministrativeGender.FEMALE);
			break;
		case OTHER:
			fhirPatient.setGender(AdministrativeGender.OTHER);
			break;
		case UNKNOWN:
			fhirPatient.setGender(AdministrativeGender.UNKNOWN);
			break;
		}

		fhirPatient.addTelecom().setSystem(ContactPointSystem.SMS).setValue(locatorFormDTO.getMobilePhone());
		fhirPatient.addTelecom().setSystem(ContactPointSystem.PHONE).setValue(locatorFormDTO.getFixedPhone());
		fhirPatient.addTelecom().setSystem(ContactPointSystem.OTHER).setValue(locatorFormDTO.getBusinessPhone());
		fhirPatient.addTelecom().setSystem(ContactPointSystem.EMAIL).setValue(locatorFormDTO.getEmail());

		ContactComponent contact = fhirPatient.addContact();//
		HumanName contactName = new HumanName().addGiven(locatorFormDTO.getEmergencyContact().getFirstName())
				.setFamily(locatorFormDTO.getEmergencyContact().getLastName());
		contact.setName(contactName)//
				.addTelecom()//
				.setSystem(ContactPointSystem.SMS)//
				.setValue(locatorFormDTO.getEmergencyContact().getMobilePhone());

		Address permAddress = fhirPatient.addAddress();
		permAddress.setCity(locatorFormDTO.getPermanentAddress().getCity())//
				.setCountry(locatorFormDTO.getPermanentAddress().getCountry())//
				.setPostalCode(locatorFormDTO.getPermanentAddress().getZipPostalCode())//
				.setState(locatorFormDTO.getPermanentAddress().getStateProvince())//
				.addLine(locatorFormDTO.getPermanentAddress().getApartmentNumber())//
				.addLine(locatorFormDTO.getPermanentAddress().getNumberAndStreet())//
				.setUse(AddressUse.HOME)//
				.setType(AddressType.PHYSICAL);

		Address tempAddress = fhirPatient.addAddress();
		tempAddress.setCity(locatorFormDTO.getTemporaryAddress().getCity())//
				.setCountry(locatorFormDTO.getTemporaryAddress().getCountry())//
				.setPostalCode(locatorFormDTO.getTemporaryAddress().getZipPostalCode())//
				.setState(locatorFormDTO.getTemporaryAddress().getStateProvince())//
				.addLine(locatorFormDTO.getTemporaryAddress().getApartmentNumber())//
				.addLine(locatorFormDTO.getTemporaryAddress().getHotelName())//
				.addLine(locatorFormDTO.getTemporaryAddress().getNumberAndStreet())//
				.setUse(AddressUse.TEMP)//
				.setType(AddressType.PHYSICAL);

		return fhirPatient;
	}

	@Override
	public Map<SummaryAccessInfo, LabelContentPair> createLabelContentPair(@Valid LocatorFormDTO locatorFormDTO) {
		String hash;
		try {
			hash = SecurityUtil.getSHA256Hash(objectMapper.writeValueAsString(locatorFormDTO));
		} catch (NoSuchAlgorithmException | JsonProcessingException e) {
			log.error("could not create access token for summary for ServiceRequest: "
					+ locatorFormDTO.getServiceRequestId());
			hash = "";
		}
		Map<SummaryAccessInfo, LabelContentPair> labels = new HashMap<>();
//		List<LabelContentPair> idAndLabels = new ArrayList<>();
		String patientName = locatorFormDTO.getFirstName();
		String serviceRequestId = locatorFormDTO.getServiceRequestId();
		labels.put(new SummaryAccessInfo(serviceRequestId, hash), new LabelContentPair(
				patientName + "'s Service Identifier", StringUtils.substring(serviceRequestId, 0, barcodeLength)));
		for (Traveller traveller : locatorFormDTO.getFamilyTravelCompanions()) {
			patientName = traveller.getFirstName();
			serviceRequestId = traveller.getServiceRequestId();
			labels.put(new SummaryAccessInfo(serviceRequestId, hash), new LabelContentPair(
					patientName + "'s Service Identifier", StringUtils.substring(serviceRequestId, 0, barcodeLength)));
		}
		for (Traveller traveller : locatorFormDTO.getNonFamilyTravelCompanions()) {
			patientName = traveller.getFirstName();
			serviceRequestId = traveller.getServiceRequestId();
			labels.put(new SummaryAccessInfo(serviceRequestId, hash), new LabelContentPair(
					patientName + "'s Service Identifier", StringUtils.substring(serviceRequestId, 0, barcodeLength)));
		}
		return labels;
	}

	private QuestionnaireResponse createQuestionareResponse(@Valid LocatorFormDTO locatorFormDTO,
			TaskStatus taskStatus) {
		QuestionnaireResponse questionnaireResponse = new QuestionnaireResponse();
		String questionnaireResponseId = locatorFormDTO.getQuestionnaireResponseId();
		if (StringUtils.isBlank(questionnaireResponseId)) {
			questionnaireResponseId = UUID.randomUUID().toString();
		}
		locatorFormDTO.setQuestionnaireResponseId(questionnaireResponseId);
		questionnaireResponse.setId(questionnaireResponseId);
		if (taskStatus == TaskStatus.DRAFT) {
			questionnaireResponse.setStatus(QuestionnaireResponseStatus.INPROGRESS);
		} else if (taskStatus == TaskStatus.REQUESTED) {
			questionnaireResponse.setStatus(QuestionnaireResponseStatus.COMPLETED);
		}
		questionnaireResponse
				.addBasedOn(new Reference(ResourceType.ServiceRequest + "/" + locatorFormDTO.getServiceRequestId()));
		questionnaireResponse.setSubject(new Reference(ResourceType.Patient + "/" + locatorFormDTO.getPatientId()));
		questionnaireResponse
				.setIdentifier(new Identifier().setSystem(locatorFormFhirSystem).setValue(questionnaireResponseId));
		questionnaireResponse.setAuthored(new Date());
		questionnaireResponse.setQuestionnaire(questionnaireId);

		QuestionnaireResponseItemComponent seatItem = questionnaireResponse.addItem();
		seatItem.setLinkId(FhirConstants.SEAT_LINK_ID).setText("Seat");
		QuestionnaireResponseItemAnswerComponent seatAnswer = seatItem.addAnswer();
		if (StringUtils.isNotBlank(locatorFormDTO.getSeatNumber())) {
			seatAnswer.setValue(new StringType(locatorFormDTO.getSeatNumber()));
		}

		QuestionnaireResponseItemComponent nationalityItem = questionnaireResponse.addItem();
		nationalityItem.setLinkId(FhirConstants.NATIONALITY_LINK_ID).setText("Nationality");
		for (String countryCode : locatorFormDTO.getPassengerNationality()) {
			String country = LocatorFormUtil.getCountryLabelForValue(countryCode);
			QuestionnaireResponseItemAnswerComponent nationalityAnswer = nationalityItem.addAnswer();
			nationalityAnswer.setValue(new StringType(country));
		}

		QuestionnaireResponseItemComponent airLineItem = questionnaireResponse.addItem();
		airLineItem.setLinkId(FhirConstants.AIRLINE_LINK_ID).setText("Airline");
		QuestionnaireResponseItemAnswerComponent airLineAnswer = airLineItem.addAnswer();
		if (StringUtils.isNotBlank(locatorFormDTO.getAirlineName())) {
			airLineAnswer.setValue(new StringType(locatorFormDTO.getAirlineName()));
		}

		QuestionnaireResponseItemComponent flightItem = questionnaireResponse.addItem();
		flightItem.setLinkId(FhirConstants.FLIGHT_LINK_ID).setText("Flight");
		QuestionnaireResponseItemAnswerComponent flightAnswer = flightItem.addAnswer();
		if (StringUtils.isNotBlank(locatorFormDTO.getFlightNumber())) {
			flightAnswer.setValue(new StringType(locatorFormDTO.getFlightNumber()));
		}

		QuestionnaireResponseItemComponent countriesVistedItem = questionnaireResponse.addItem();
		countriesVistedItem.setLinkId(FhirConstants.COUNTRIES_VISTED_LINK_ID)
				.setText("Countries Vistied within 6 Months");
		for (String countryCode : locatorFormDTO.getCountriesVisited()) {
			String country = LocatorFormUtil.getCountryLabelForValue(countryCode);
			QuestionnaireResponseItemAnswerComponent countriesVistedAnswer = countriesVistedItem.addAnswer();
			countriesVistedAnswer.setValue(new StringType(country));
		}

		QuestionnaireResponseItemComponent infectionItem = questionnaireResponse.addItem();
		infectionItem.setLinkId(FhirConstants.PREVIOUS_INFECTION_LINK_ID).setText("Previous Infection");
		QuestionnaireResponseItemAnswerComponent infectionAnswer = infectionItem.addAnswer();
		Boolean previousInfection = Boolean.parseBoolean(Objects.toString(locatorFormDTO.getHadCovidBefore()));
		infectionAnswer.setValue(new BooleanType(previousInfection));

		QuestionnaireResponseItemComponent feverItem = questionnaireResponse.addItem();
		feverItem.setLinkId(FhirConstants.FEVER_LINK_ID).setText("Fever");
		QuestionnaireResponseItemAnswerComponent feverAnswer = feverItem.addAnswer();
		Boolean feverInfection = Boolean.parseBoolean(Objects.toString(locatorFormDTO.getFever()));
		feverAnswer.setValue(new BooleanType(feverInfection));

		QuestionnaireResponseItemComponent soreThroatItem = questionnaireResponse.addItem();
		soreThroatItem.setLinkId(FhirConstants.SORE_THROAT_LINK_ID).setText("Sore Throat");
		QuestionnaireResponseItemAnswerComponent soreThroatAnswer = soreThroatItem.addAnswer();
		Boolean soreThroat = Boolean.parseBoolean(Objects.toString(locatorFormDTO.getSoreThroat()));
		soreThroatAnswer.setValue(new BooleanType(soreThroat));

		QuestionnaireResponseItemComponent jointPainItem = questionnaireResponse.addItem();
		jointPainItem.setLinkId(FhirConstants.SORE_THROAT_LINK_ID).setText("Joint Pain");
		QuestionnaireResponseItemAnswerComponent jointPainAnswer = jointPainItem.addAnswer();
		Boolean jointPain = Boolean.parseBoolean(Objects.toString(locatorFormDTO.getJointPain()));
		jointPainAnswer.setValue(new BooleanType(jointPain));

		QuestionnaireResponseItemComponent coughItem = questionnaireResponse.addItem();
		coughItem.setLinkId(FhirConstants.COUGH_LINK_ID).setText("Cough");
		QuestionnaireResponseItemAnswerComponent coughAnswer = coughItem.addAnswer();
		Boolean cough = Boolean.parseBoolean(Objects.toString(locatorFormDTO.getCough()));
		coughAnswer.setValue(new BooleanType(cough));

		QuestionnaireResponseItemComponent breathingDifficultyItem = questionnaireResponse.addItem();
		breathingDifficultyItem.setLinkId(FhirConstants.BREATHING_LINK_ID).setText("Breathing Difficulty");
		QuestionnaireResponseItemAnswerComponent breathingDifficultyAnswer = breathingDifficultyItem.addAnswer();
		Boolean breathingDifficulty = Boolean.parseBoolean(Objects.toString(locatorFormDTO.getBreathingDifficulties()));
		breathingDifficultyAnswer.setValue(new BooleanType(breathingDifficulty));

		QuestionnaireResponseItemComponent rashItem = questionnaireResponse.addItem();
		rashItem.setLinkId(FhirConstants.RASH_LINK_ID).setText("Rash");
		QuestionnaireResponseItemAnswerComponent rashAnswer = rashItem.addAnswer();
		Boolean rash = Boolean.parseBoolean(Objects.toString(locatorFormDTO.getRash()));
		rashAnswer.setValue(new BooleanType(rash));

		QuestionnaireResponseItemComponent senseOfSmellItem = questionnaireResponse.addItem();
		senseOfSmellItem.setLinkId(FhirConstants.SENSE_OF_SMELL_LINK_ID).setText("Sense of Smell or Taste");
		QuestionnaireResponseItemAnswerComponent senseOfSmellAnswer = senseOfSmellItem.addAnswer();
		Boolean senseOfSmell = Boolean.parseBoolean(Objects.toString(locatorFormDTO.getSmellOrTaste()));
		senseOfSmellAnswer.setValue(new BooleanType(senseOfSmell));

		QuestionnaireResponseItemComponent contactWithInfectedItem = questionnaireResponse.addItem();
		contactWithInfectedItem.setLinkId(FhirConstants.CONTACT_WITH_NFECTED_LINK_ID)
				.setText("Contact with Infected Individual");
		QuestionnaireResponseItemAnswerComponent contactWithInfectedAnswer = contactWithInfectedItem.addAnswer();
		Boolean contactWithInfected = Boolean.parseBoolean(Objects.toString(locatorFormDTO.getContact()));
		contactWithInfectedAnswer.setValue(new BooleanType(contactWithInfected));

		QuestionnaireResponseItemComponent mobilePhoneItem = questionnaireResponse.addItem();
		mobilePhoneItem.setLinkId(FhirConstants.MOBILE_PHONE_LINK_ID).setText("Mobile Phone");
		QuestionnaireResponseItemAnswerComponent mobilePhoneAnswer = mobilePhoneItem.addAnswer();
		if (StringUtils.isNotBlank(locatorFormDTO.getMobilePhone())) {
			mobilePhoneAnswer.setValue(new StringType(locatorFormDTO.getMobilePhone()));
		}

		QuestionnaireResponseItemComponent fixedPhoneItem = questionnaireResponse.addItem();
		fixedPhoneItem.setLinkId(FhirConstants.FIXED_PHONE_LINK_ID).setText("Fixed Phone");
		QuestionnaireResponseItemAnswerComponent fixedPhoneAnswer = fixedPhoneItem.addAnswer();
		if (StringUtils.isNotBlank(locatorFormDTO.getFixedPhone())) {
			fixedPhoneAnswer.setValue(new StringType(locatorFormDTO.getFixedPhone()));
		}

		QuestionnaireResponseItemComponent workPhoneItem = questionnaireResponse.addItem();
		workPhoneItem.setLinkId(FhirConstants.WORK_PHONE_LINK_ID).setText("Work Phone");
		QuestionnaireResponseItemAnswerComponent workPhoneAnswer = workPhoneItem.addAnswer();
		if (StringUtils.isNotBlank(locatorFormDTO.getBusinessPhone())) {
			workPhoneAnswer.setValue(new StringType(locatorFormDTO.getBusinessPhone()));
		}

		QuestionnaireResponseItemComponent emailItem = questionnaireResponse.addItem();
		emailItem.setLinkId(FhirConstants.WORK_PHONE_LINK_ID).setText("Email");
		QuestionnaireResponseItemAnswerComponent emailAnswer = emailItem.addAnswer();
		if (StringUtils.isNotBlank(locatorFormDTO.getEmail())) {
			emailAnswer.setValue(new StringType(locatorFormDTO.getEmail()));
		}

		QuestionnaireResponseItemComponent nationalIdItem = questionnaireResponse.addItem();
		nationalIdItem.setLinkId(FhirConstants.WORK_PHONE_LINK_ID).setText("National ID");
		QuestionnaireResponseItemAnswerComponent nationalIdAnswer = nationalIdItem.addAnswer();
		if (StringUtils.isNotBlank(locatorFormDTO.getNationalID())) {
			nationalIdAnswer.setValue(new StringType(locatorFormDTO.getNationalID()));
		}

		QuestionnaireResponseItemComponent passportCountryItem = questionnaireResponse.addItem();
		passportCountryItem.setLinkId(FhirConstants.PASSPORT_COUNTRY_LINK_ID).setText("Passport Country of Issue");
		QuestionnaireResponseItemAnswerComponent passportCountryAnswer = passportCountryItem.addAnswer();
		if (StringUtils.isNotBlank(locatorFormDTO.getCountryOfPassportIssue())) {
			String country = LocatorFormUtil.getCountryLabelForValue(locatorFormDTO.getCountryOfPassportIssue());
			passportCountryAnswer.setValue(new StringType(country));
		}

		QuestionnaireResponseItemComponent passportNumberItem = questionnaireResponse.addItem();
		passportNumberItem.setLinkId(FhirConstants.PASSPORT_NUMBER_LINK_ID).setText("Passport Number");
		QuestionnaireResponseItemAnswerComponent passportNumberAnswer = passportNumberItem.addAnswer();
		if (StringUtils.isNotBlank(locatorFormDTO.getPassportNumber())) {
			passportNumberAnswer.setValue(new StringType(locatorFormDTO.getPassportNumber()));
		}

		QuestionnaireResponseItemComponent purposeOfVisitItem = questionnaireResponse.addItem();
        purposeOfVisitItem.setLinkId(FhirConstants.PURPOSE_OF_VIST_LINK_ID).setText("Purpose of Visit");
        QuestionnaireResponseItemAnswerComponent purposeOfVisitAnswer = purposeOfVisitItem.addAnswer();
        if (StringUtils.isNotBlank(locatorFormDTO.getVisitPurpose().toString())) {
            purposeOfVisitAnswer.setValue(new StringType(locatorFormDTO.getVisitPurpose().toString()));
        }

        QuestionnaireResponseItemComponent dateOfArrivalItem = questionnaireResponse.addItem();
        dateOfArrivalItem.setLinkId(FhirConstants.DATE_OF_ARRIVAL_LINK_ID).setText("Date Of Arrival");
        QuestionnaireResponseItemAnswerComponent dateOfArrivalAnswer = dateOfArrivalItem.addAnswer();
        if (StringUtils.isNotBlank(locatorFormDTO.getArrivalDate().toString())) {
            dateOfArrivalAnswer.setValue(new StringType(locatorFormDTO.getArrivalDate().toString()));
        }

		QuestionnaireResponseItemComponent healthOfficeItem = questionnaireResponse.addItem();
		healthOfficeItem.setLinkId(FhirConstants.HEALTH_OFFICE_LINK_ID).setText("Health Office");
		QuestionnaireResponseItemAnswerComponent healthOfficeAnswer = healthOfficeItem.addAnswer();

		QuestionnaireResponseItemComponent testKitIdItem = questionnaireResponse.addItem();
		testKitIdItem.setLinkId(FhirConstants.TEST_KIT_ID_LINK_ID).setText("Test Kit Id");
		QuestionnaireResponseItemAnswerComponent testKitIdAnswer = testKitIdItem.addAnswer();
		if (locatorFormDTO instanceof HealthDeskDTO) {
			HealthDeskDTO healthDeskDto = (HealthDeskDTO) locatorFormDTO;
			if (StringUtils.isNotBlank(healthDeskDto.getHealthOffice())) {
				healthOfficeAnswer.setValue(new StringType(healthDeskDto.getHealthOffice()));
			}
			if (StringUtils.isNotBlank(healthDeskDto.getTestKitId())) {
				testKitIdAnswer.setValue(new StringType(healthDeskDto.getHealthOffice()));
			}

		}

		return questionnaireResponse;
	}

	@Override
	public Questionnaire createQuestionnaire() {
		Questionnaire questionnaire = new Questionnaire();
		questionnaire.setId(questionnaireId);
		// questionnaire.setStatus(PublicationStatus.DRAFT);
		questionnaire.addIdentifier(new Identifier().setSystem(locatorFormFhirSystem).setValue(questionnaireId));
		questionnaire.setTitle("Locator Form Questionnaire");
		questionnaire.setDate(new Date());
		questionnaire.setPublisher(locatorFormFhirSystem);

		QuestionnaireItemComponent seatItem = questionnaire.addItem();
		seatItem.setLinkId(FhirConstants.SEAT_LINK_ID).setText("Seat").setType(QuestionnaireItemType.TEXT);

		QuestionnaireItemComponent nationalityItem = questionnaire.addItem();
		nationalityItem.setLinkId(FhirConstants.NATIONALITY_LINK_ID).setText("Nationality")
				.setType(QuestionnaireItemType.TEXT);

		QuestionnaireItemComponent airLineItem = questionnaire.addItem();
		airLineItem.setLinkId(FhirConstants.AIRLINE_LINK_ID).setText("Airline").setType(QuestionnaireItemType.TEXT);

		QuestionnaireItemComponent flightItem = questionnaire.addItem();
		flightItem.setLinkId(FhirConstants.FLIGHT_LINK_ID).setText("Flight").setType(QuestionnaireItemType.TEXT);

		QuestionnaireItemComponent countriesVistedItem = questionnaire.addItem();
		countriesVistedItem.setLinkId(FhirConstants.COUNTRIES_VISTED_LINK_ID)
				.setText("Countries Vistied within 6 Months").setType(QuestionnaireItemType.TEXT);

		QuestionnaireItemComponent infectionItem = questionnaire.addItem();
		infectionItem.setLinkId(FhirConstants.PREVIOUS_INFECTION_LINK_ID).setText("Previous Infection")
				.setType(QuestionnaireItemType.BOOLEAN);

		QuestionnaireItemComponent feverItem = questionnaire.addItem();
		feverItem.setLinkId(FhirConstants.FEVER_LINK_ID).setText("Fever").setType(QuestionnaireItemType.BOOLEAN);

		QuestionnaireItemComponent soreThroatItem = questionnaire.addItem();
		soreThroatItem.setLinkId(FhirConstants.SORE_THROAT_LINK_ID).setText("Sore Throat")
				.setType(QuestionnaireItemType.BOOLEAN);

		QuestionnaireItemComponent jointPainItem = questionnaire.addItem();
		jointPainItem.setLinkId(FhirConstants.SORE_THROAT_LINK_ID).setText("Joint Pain")
				.setType(QuestionnaireItemType.BOOLEAN);

		QuestionnaireItemComponent coughItem = questionnaire.addItem();
		coughItem.setLinkId(FhirConstants.COUGH_LINK_ID).setText("Cough").setType(QuestionnaireItemType.BOOLEAN);

		QuestionnaireItemComponent breathingDifficultyItem = questionnaire.addItem();
		breathingDifficultyItem.setLinkId(FhirConstants.BREATHING_LINK_ID).setText("Breathing Difficulty")
				.setType(QuestionnaireItemType.BOOLEAN);

		QuestionnaireItemComponent rashItem = questionnaire.addItem();
		rashItem.setLinkId(FhirConstants.RASH_LINK_ID).setText("Rash").setType(QuestionnaireItemType.BOOLEAN);

		QuestionnaireItemComponent senseOfSmellItem = questionnaire.addItem();
		senseOfSmellItem.setLinkId(FhirConstants.SENSE_OF_SMELL_LINK_ID).setText("Sense of Smell or Taste")
				.setType(QuestionnaireItemType.BOOLEAN);

		QuestionnaireItemComponent contactWithInfectedItem = questionnaire.addItem();
		contactWithInfectedItem.setLinkId(FhirConstants.CONTACT_WITH_NFECTED_LINK_ID)
				.setText("Contact with Infected Individual").setType(QuestionnaireItemType.BOOLEAN);

		QuestionnaireItemComponent mobilePhoneItem = questionnaire.addItem();
		mobilePhoneItem.setLinkId(FhirConstants.MOBILE_PHONE_LINK_ID).setText("Mobile Phone")
				.setType(QuestionnaireItemType.TEXT);

		QuestionnaireItemComponent fixedPhoneItem = questionnaire.addItem();
		fixedPhoneItem.setLinkId(FhirConstants.FIXED_PHONE_LINK_ID).setText("Fixed Phone")
				.setType(QuestionnaireItemType.TEXT);

		QuestionnaireItemComponent workPhoneItem = questionnaire.addItem();
		workPhoneItem.setLinkId(FhirConstants.WORK_PHONE_LINK_ID).setText("Work Phone")
				.setType(QuestionnaireItemType.TEXT);

		QuestionnaireItemComponent emailItem = questionnaire.addItem();
		emailItem.setLinkId(FhirConstants.WORK_PHONE_LINK_ID).setText("Email").setType(QuestionnaireItemType.TEXT);

		QuestionnaireItemComponent nationalIdItem = questionnaire.addItem();
		nationalIdItem.setLinkId(FhirConstants.WORK_PHONE_LINK_ID).setText("National ID")
				.setType(QuestionnaireItemType.TEXT);

		QuestionnaireItemComponent passportCountryItem = questionnaire.addItem();
		passportCountryItem.setLinkId(FhirConstants.PASSPORT_COUNTRY_LINK_ID).setText("Passport Country of Issue")
				.setType(QuestionnaireItemType.TEXT);

		QuestionnaireItemComponent passportNumberItem = questionnaire.addItem();
		passportNumberItem.setLinkId(FhirConstants.PASSPORT_NUMBER_LINK_ID).setText("Passport Number")
				.setType(QuestionnaireItemType.TEXT);

		QuestionnaireItemComponent visitPurposeItem = questionnaire.addItem();
		visitPurposeItem.setLinkId(FhirConstants.PURPOSE_OF_VIST_LINK_ID).setText("Purpose of Visit")
				.setType(QuestionnaireItemType.TEXT);

		QuestionnaireItemComponent healthOfficeItem = questionnaire.addItem();
		healthOfficeItem.setLinkId(FhirConstants.HEALTH_OFFICE_LINK_ID).setText("Health Office")
				.setType(QuestionnaireItemType.TEXT);

		QuestionnaireItemComponent testKitIdItem = questionnaire.addItem();
		testKitIdItem.setLinkId(FhirConstants.TEST_KIT_ID_LINK_ID).setText("Test Kit Id")
						.setType(QuestionnaireItemType.TEXT);

		return questionnaire;
	}
}
