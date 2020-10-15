package org.itech.locator.form.webapp.fhir.service.transform.impl;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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
import org.hl7.fhir.r4.model.Task;
import org.hl7.fhir.r4.model.Task.TaskStatus;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.api.dto.Traveller;
import org.itech.locator.form.webapp.barcode.LabelContentPair;
import org.itech.locator.form.webapp.fhir.service.transform.FhirTransformService;
import org.springframework.beans.factory.annotation.Autowired;
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

	@Value("${org.itech.locator.form.barcodelength:36}")
	private Integer barcodeLength;

	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public TransactionObjects createTransactionObjects(LocatorFormDTO locatorFormDTO) throws JsonProcessingException {
		TransactionObjects transactionInfo = new TransactionObjects();
		Bundle transactionBundle = new Bundle();
		transactionBundle.setType(BundleType.TRANSACTION);
		transactionInfo.bundle = transactionBundle;

		Task fhirTask = createFhirTask();
		fhirTask.setDescription(objectMapper.writeValueAsString(locatorFormDTO));
		transactionBundle.addEntry(createTransactionBundleComponent(fhirTask));
		transactionInfo.task = fhirTask;

		ServiceRequestPatientPair fhirServiceRequestPatient = createFhirServiceRequestPatient(locatorFormDTO,
				locatorFormDTO);
		addServiceRequestPatientPairToTransaction(fhirServiceRequestPatient, transactionInfo);

		for (Traveller comp : locatorFormDTO.getFamilyTravelCompanions()) {
			fhirServiceRequestPatient = createFhirServiceRequestPatient(locatorFormDTO, comp);
			addServiceRequestPatientPairToTransaction(fhirServiceRequestPatient, transactionInfo);
		}

		for (Traveller comp : locatorFormDTO.getNonFamilyTravelCompanions()) {
			fhirServiceRequestPatient = createFhirServiceRequestPatient(locatorFormDTO, comp);
			addServiceRequestPatientPairToTransaction(fhirServiceRequestPatient, transactionInfo);
		}

		return transactionInfo;
	}

	private void addServiceRequestPatientPairToTransaction(ServiceRequestPatientPair fhirServiceRequestPatient,
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
	public Patient createFhirPatient(LocatorFormDTO locatorFormDTO, Traveller comp) {
		Patient fhirPatient = new Patient();
		String patientId = UUID.randomUUID().toString();
		fhirPatient.setId(patientId);

		HumanName humanName = new HumanName();
		List<HumanName> humanNameList = new ArrayList<>();
		humanName.setFamily(comp.getLastName());
		humanName.addGiven(comp.getFirstName());
		humanNameList.add(humanName);
		fhirPatient.setName(humanNameList);

		List<Identifier> identifierList = new ArrayList<>();

		Identifier identifier = new Identifier();
		identifier.setId(patientId);
		identifier.setSystem("https://host.openelis.org/locator-form"); // fix hardcode
		identifierList.add(identifier);

		identifier = new Identifier();
		identifier.setId(comp.getPassportNumber());
		identifier.setSystem("passport"); // fix hardcode
		identifierList.add(identifier);

		if (!StringUtils.isAllBlank(locatorFormDTO.getNationalID()) && comp == locatorFormDTO) {
			identifier = new Identifier();
			identifier.setId(locatorFormDTO.getNationalID());
			identifier.setSystem("http://govmu.org"); // fix hardcode
			identifierList.add(identifier);
		}
		fhirPatient.setIdentifier(identifierList);

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
	public Task createFhirTask() {
		Task fhirTask = new Task();
		String taskId = UUID.randomUUID().toString();
		fhirTask.setId(taskId);

		Identifier identifier = new Identifier();
		identifier.setId(taskId);
		identifier.setSystem("https://host.openelis.org/locator-form"); // fix hardcode
		fhirTask.setStatus(TaskStatus.REQUESTED);
		List<Identifier> identifierList = new ArrayList<>();
		identifierList.add(identifier);

		fhirTask.setIdentifier(identifierList);

		return fhirTask;
	}

	@Override
	public ServiceRequestPatientPair createFhirServiceRequestPatient(LocatorFormDTO locatorFormDTO, Traveller comp) {

		ServiceRequest serviceRequest = new ServiceRequest();
		String id = UUID.randomUUID().toString();
		serviceRequest.setId(id);

		// patient is created here and used for SR subjectRef
		Patient fhirPatient = createFhirPatient(locatorFormDTO, comp);

		Reference subjectRef = new Reference();
		subjectRef.setReference(ResourceType.Patient + "/" + fhirPatient.getIdElement().getIdPart());

		CodeableConcept codeableConcept = new CodeableConcept();
		List<Coding> codingList = new ArrayList<>();
		for (String loincCode : loincCodes) {
			Coding coding0 = new Coding();
			coding0.setCode(loincCode);
			coding0.setSystem("http://loinc.org");
			codingList.add(coding0);

			coding0 = null;
		}

		Coding coding1 = new Coding();
		coding1.setCode("TBD");
		coding1.setSystem("OpenELIS-Global/Lab No");
		codingList.add(coding1);
		codeableConcept.setCoding(codingList);

		serviceRequest.setCode(codeableConcept);
		serviceRequest.setSubject(subjectRef);
		return new ServiceRequestPatientPair(serviceRequest, fhirPatient);

	}

	@Override
	public List<LabelContentPair> createLabelContentPair(TransactionObjects transactionObjects) {
		List<LabelContentPair> idAndLabels = new ArrayList<>();
		for (ServiceRequestPatientPair sRequestPatientPair : transactionObjects.serviceRequestPatientPairs) {
			String patientName = sRequestPatientPair.patient.getNameFirstRep().getGivenAsSingleString();
			String serviceRequestId = sRequestPatientPair.serviceRequest.getIdElement().getIdPart();
			idAndLabels.add(new LabelContentPair(patientName + "'s Service Identifier",
					StringUtils.substring(serviceRequestId, 0, barcodeLength)));
		}
		return idAndLabels;
	}

}
