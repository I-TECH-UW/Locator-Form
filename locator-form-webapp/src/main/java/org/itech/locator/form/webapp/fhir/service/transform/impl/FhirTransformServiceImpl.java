package org.itech.locator.form.webapp.fhir.service.transform.impl;

import java.security.NoSuchAlgorithmException;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.hl7.fhir.r4.model.Address;
import org.hl7.fhir.r4.model.Address.AddressType;
import org.hl7.fhir.r4.model.Address.AddressUse;
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
import org.hl7.fhir.r4.model.Reference;
import org.hl7.fhir.r4.model.Resource;
import org.hl7.fhir.r4.model.ResourceType;
import org.hl7.fhir.r4.model.ServiceRequest;
import org.hl7.fhir.r4.model.Specimen;
import org.hl7.fhir.r4.model.Specimen.SpecimenStatus;
import org.hl7.fhir.r4.model.Task;
import org.hl7.fhir.r4.model.Task.TaskRestrictionComponent;
import org.hl7.fhir.r4.model.Task.TaskStatus;
import org.itech.locator.form.webapp.api.dto.HealthDeskDTO;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.api.dto.PIODTO;
import org.itech.locator.form.webapp.api.dto.Traveller;
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

	private ObjectMapper objectMapper;

	public FhirTransformServiceImpl(ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
	}

	@Override
	public TransactionObjects createTransactionObjects(LocatorFormDTO locatorFormDTO, TaskStatus status)
			throws JsonProcessingException {
		TransactionObjects transactionInfo = new TransactionObjects();
		Bundle transactionBundle = new Bundle();
		transactionBundle.setType(BundleType.TRANSACTION);
		transactionInfo.bundle = transactionBundle;

		locatorFormDTO.setTaskId(UUID.randomUUID().toString());
		Task fhirTask = createFhirTask(locatorFormDTO, status);

		locatorFormDTO.setTaskId(fhirTask.getIdElement().getIdPart());
		transactionBundle.addEntry(createTransactionBundleComponent(fhirTask));
		transactionInfo.task = fhirTask;

		locatorFormDTO.setServiceRequestId(UUID.randomUUID().toString());
		locatorFormDTO.setPatientId(UUID.randomUUID().toString());
		ServiceRequestObjects fhirServiceRequestPatient = createFhirServiceRequestPatient(locatorFormDTO,
				locatorFormDTO);
		addServiceRequestPatientPairToTransaction(fhirServiceRequestPatient, transactionInfo);

		for (Traveller comp : locatorFormDTO.getFamilyTravelCompanions()) {
			comp.setServiceRequestId(UUID.randomUUID().toString());
			comp.setPatientId(UUID.randomUUID().toString());
			fhirServiceRequestPatient = createFhirServiceRequestPatient(locatorFormDTO, comp);
			addServiceRequestPatientPairToTransaction(fhirServiceRequestPatient, transactionInfo);
		}

		for (Traveller comp : locatorFormDTO.getNonFamilyTravelCompanions()) {
			comp.setServiceRequestId(UUID.randomUUID().toString());
			comp.setPatientId(UUID.randomUUID().toString());
			fhirServiceRequestPatient = createFhirServiceRequestPatient(locatorFormDTO, comp);
			addServiceRequestPatientPairToTransaction(fhirServiceRequestPatient, transactionInfo);
		}

		// locatorFormDTO added at end so that any updated values (like
		// serviceRequestId) get added to the
		fhirTask.setDescription(objectMapper.writeValueAsString(locatorFormDTO));

		return transactionInfo;
	}

	@Override
	public TransactionObjects createTransactionObjects(PIODTO pioDTO, TaskStatus status)
			throws JsonProcessingException {
		TransactionObjects transactionInfo = new TransactionObjects();
		Bundle transactionBundle = new Bundle();
		transactionBundle.setType(BundleType.TRANSACTION);
		transactionInfo.bundle = transactionBundle;

		Task fhirTask = createFhirTask(pioDTO, status);
		transactionBundle.addEntry(createTransactionBundleComponent(fhirTask));
		transactionInfo.task = fhirTask;

		ServiceRequestObjects fhirServiceRequestPatient = createFhirServiceRequestPatient(pioDTO, pioDTO);
		addServiceRequestPatientPairToTransaction(fhirServiceRequestPatient, transactionInfo);

		for (Traveller comp : pioDTO.getFamilyTravelCompanions()) {
			fhirServiceRequestPatient = createFhirServiceRequestPatient(pioDTO, comp);
			addServiceRequestPatientPairToTransaction(fhirServiceRequestPatient, transactionInfo);
		}

		for (Traveller comp : pioDTO.getNonFamilyTravelCompanions()) {
			fhirServiceRequestPatient = createFhirServiceRequestPatient(pioDTO, comp);
			addServiceRequestPatientPairToTransaction(fhirServiceRequestPatient, transactionInfo);
		}

		// locatorFormDTO added at end so that any updated values (like
		// serviceRequestId) get persisted
		fhirTask.setDescription(objectMapper.writeValueAsString(pioDTO));

		return transactionInfo;
	}

	@Override
	public TransactionObjects createTransactionObjects(HealthDeskDTO healthDeskDTO, TaskStatus status)
			throws JsonProcessingException {
		TransactionObjects transactionInfo = new TransactionObjects();
		Bundle transactionBundle = new Bundle();
		transactionBundle.setType(BundleType.TRANSACTION);
		transactionInfo.bundle = transactionBundle;

		Task fhirTask = createFhirTask(healthDeskDTO, status);
		transactionBundle.addEntry(createTransactionBundleComponent(fhirTask));
		transactionInfo.task = fhirTask;

		ServiceRequestObjects fhirServiceRequestPatient = createFhirServiceRequestPatient(healthDeskDTO,
				healthDeskDTO);
		addServiceRequestPatientPairToTransaction(fhirServiceRequestPatient, transactionInfo);

		for (Traveller comp : healthDeskDTO.getFamilyTravelCompanions()) {
			fhirServiceRequestPatient = createFhirServiceRequestPatient(healthDeskDTO, comp);
			addServiceRequestPatientPairToTransaction(fhirServiceRequestPatient, transactionInfo);
		}

		for (Traveller comp : healthDeskDTO.getNonFamilyTravelCompanions()) {
			fhirServiceRequestPatient = createFhirServiceRequestPatient(healthDeskDTO, comp);
			addServiceRequestPatientPairToTransaction(fhirServiceRequestPatient, transactionInfo);
		}

		// locatorFormDTO added at end so that any updated values (like
		// serviceRequestId) get persisted
		fhirTask.setDescription(objectMapper.writeValueAsString(healthDeskDTO));

		return transactionInfo;
	}

	private void addServiceRequestPatientPairToTransaction(ServiceRequestObjects fhirServiceRequestPatient,
			TransactionObjects transactionInfo) {
		transactionInfo.bundle.addEntry(createTransactionBundleComponent(fhirServiceRequestPatient.serviceRequest));
		transactionInfo.bundle.addEntry(createTransactionBundleComponent(fhirServiceRequestPatient.patient));

		Reference basedOnRef = new Reference();
		basedOnRef.setReference(ResourceType.ServiceRequest.toString() + "/"
				+ fhirServiceRequestPatient.serviceRequest.getIdElement().getIdPart());
		basedOnRef.setType(ResourceType.ServiceRequest.toString());
		transactionInfo.task.addBasedOn(basedOnRef);
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

	@Override
	public Task createFhirTask(LocatorFormDTO locatorFormDTO, TaskStatus status) {
		Task fhirTask = new Task();
		String taskId = locatorFormDTO.getTaskId();
		if (StringUtils.isEmpty(taskId)) {
			taskId = UUID.randomUUID().toString();
		}
		fhirTask.setId(taskId);
		locatorFormDTO.setTaskId(taskId);

		Identifier identifier = new Identifier();
		identifier.setId(taskId);
		identifier.setSystem("https://host.openelis.org/locator-form"); // fix hardcode
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

	@Override
	public ServiceRequestObjects createFhirServiceRequestPatient(LocatorFormDTO locatorFormDTO, Traveller comp) {
		// patient is created here and used for SR subjectRef
		Patient fhirPatient = createFhirPatient(locatorFormDTO, comp);
		// patient is created here and used for SR subjectRef
		Specimen specimen = createSpecimen(locatorFormDTO, comp);
		// patient is created here and used for SR subjectRef

		ServiceRequest serviceRequest = new ServiceRequest();
		String serviceRequestId = comp.getServiceRequestId();
		if (StringUtils.isEmpty(serviceRequestId)) {
			serviceRequestId = UUID.randomUUID().toString();
		}
		serviceRequest.setId(serviceRequestId);
		comp.setServiceRequestId(serviceRequestId);
		CodeableConcept codeableConcept = new CodeableConcept();
		for (String loincCode : loincCodes) {
			codeableConcept.addCoding(new Coding().setCode(loincCode).setSystem("http://loinc.org"));
		}
		serviceRequest.setCode(codeableConcept);

		serviceRequest.setSubject(new Reference(ResourceType.Patient + "/" + fhirPatient.getIdElement().getIdPart()));
		serviceRequest.addSpecimen(new Reference(ResourceType.Specimen + "/" + specimen.getIdElement().getIdPart()));
		serviceRequest
				.setRequester(new Reference(requesterId));
		serviceRequest.addLocationReference(new Reference(locationId));

		specimen.addRequest(
				new Reference(ResourceType.ServiceRequest + "/" + serviceRequest.getIdElement().getIdPart()));

		return new ServiceRequestObjects(serviceRequest, fhirPatient, specimen, null, null);

	}

	private Specimen createSpecimen(LocatorFormDTO locatorFormDTO, Traveller comp) {
		Specimen specimen = new Specimen();
		String specimenId = comp.getSpecimenId();
		if (StringUtils.isEmpty(specimenId)) {
			specimenId = UUID.randomUUID().toString();
		}
		specimen.setId(specimenId);
		comp.setSpecimenId(specimenId);

		specimen.setReceivedTime(new Date());
		specimen.setType(new CodeableConcept());
		specimen.setStatus(SpecimenStatus.AVAILABLE);

		return specimen;
	}

	@Override
	public Patient createFhirPatient(LocatorFormDTO locatorFormDTO, Traveller comp) {
		Patient fhirPatient = new Patient();
		String patientId = comp.getPatientId();
		if (StringUtils.isEmpty(patientId)) {
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
		fhirPatient.addIdentifier((Identifier) new Identifier().setSystem("https://host.openelis.org/locator-form")
				.setValue(patientId).setId(patientId));
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

}
