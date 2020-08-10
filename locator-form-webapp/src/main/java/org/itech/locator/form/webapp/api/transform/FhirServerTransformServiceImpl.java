package org.itech.locator.form.webapp.api.transform;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.Coding;
import org.hl7.fhir.r4.model.Enumerations.AdministrativeGender;
import org.hl7.fhir.r4.model.HumanName;
import org.hl7.fhir.r4.model.Identifier;
import org.hl7.fhir.r4.model.Reference;
import org.hl7.fhir.r4.model.Resource;
import org.hl7.fhir.r4.model.ServiceRequest;
import org.hl7.fhir.r4.model.Task;
import org.hl7.fhir.r4.model.Task.TaskStatus;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.api.dto.TravelCompanion;
import org.springframework.beans.factory.annotation.Autowired;
//import org.openelisglobal.common.services.SampleAddService.SampleTestCollection;
//import org.openelisglobal.patient.action.bean.PatientManagementInfo;
//import org.openelisglobal.patient.valueholder.Patient;
//import org.openelisglobal.patientidentity.valueholder.PatientIdentity;
//import org.openelisglobal.sample.action.util.SamplePatientUpdateData;
//import org.openelisglobal.sample.form.SamplePatientEntryForm;
//import org.openelisglobal.sample.service.PatientManagementUpdate;
//import org.openelisglobal.test.valueholder.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FhirServerTransformServiceImpl implements FhirServerTransformService {

	@Autowired
	private FhirContext fhirContext;

	@Value("${org.itech.locator.form.fhirstore.uri}")
	private String localFhirStorePath;
	@Value("${org.itech.locator.form.loinccodes}")
	private String[] loincCodes;

	IGenericClient localFhirClient;

	@PostConstruct
	public void instantiateLocalFhirClient() {
		localFhirClient = fhirContext.newRestfulGenericClient(localFhirStorePath);
	}

	@Override
	public Bundle createFhirResource(Resource resource, UUID id) {
		log.debug("FhirServerTransformServiceImpl:CreateFhirResource: " + resource.getResourceType() + " "
				+ id.toString());
		Bundle bundle = new Bundle();
		Bundle resp = new Bundle();
		Identifier identifier = new Identifier();
		String resourceType = resource.getResourceType().toString();
//        resource.setId(IdType.newRandomUuid());
//        resource.setIdElement(IdType.newRandomUuid());
		identifier.setSystem(resource.getId());
		resource.castToIdentifier(identifier);

		try {

			bundle.addEntry().setFullUrl(resource.getIdElement().getValue()).setResource(resource).getRequest()
					.setUrl(resourceType + "/" + id).setMethod(Bundle.HTTPVerb.PUT);

//            log.debug("CreateFhirResource: " + fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(bundle));

			resp = localFhirClient.transaction().withBundle(bundle).execute();
		} catch (Exception e) {
			log.debug("FhirServerTransformServiceImpl:Transform exception: " + e.toString());
			e.printStackTrace();
		}
		return resp;
	}

	public org.hl7.fhir.r4.model.Patient createFhirPatient(TravelCompanion comp, UUID uuid) {
		org.hl7.fhir.r4.model.Patient fhirPatient = new org.hl7.fhir.r4.model.Patient();

		HumanName humanName = new HumanName();
		List<HumanName> humanNameList = new ArrayList<>();
		humanName.setFamily(comp.getLastName());
		humanName.addGiven(comp.getFirstName());
		humanNameList.add(humanName);
		fhirPatient.setName(humanNameList);

		String patientId = uuid.toString();
		Identifier identifier = new Identifier();
		identifier.setId(patientId);
		identifier.setSystem("https://host.openelis.org/locator-form"); // fix hardcode
		List<Identifier> identifierList = new ArrayList<>();
		identifierList.add(identifier);
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

		return fhirPatient;
	}

	@Override
	public org.hl7.fhir.r4.model.Patient createFhirPatient(LocatorFormDTO locatorForm, UUID uuid) {
		org.hl7.fhir.r4.model.Patient fhirPatient = new org.hl7.fhir.r4.model.Patient();

		HumanName humanName = new HumanName();
		List<HumanName> humanNameList = new ArrayList<>();
		humanName.setFamily(locatorForm.getLastName());
		humanName.addGiven(locatorForm.getFirstName());
		humanName.addGiven(locatorForm.getMiddleInitial());
		humanNameList.add(humanName);
		fhirPatient.setName(humanNameList);

		String patientId = uuid.toString();
		Identifier identifier = new Identifier();
		identifier.setId(patientId);
		identifier.setSystem("https://host.openelis.org/locator-form"); // fix hardcode
		List<Identifier> identifierList = new ArrayList<>();
		identifierList.add(identifier);
		fhirPatient.setIdentifier(identifierList);

		fhirPatient
				.setBirthDate(Date.from(locatorForm.getDateOfBirth().atStartOfDay(ZoneId.systemDefault()).toInstant()));
		switch (locatorForm.getSex()) {
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

		return fhirPatient;
	}

	@Override
	public Task createFhirTask(LocatorFormDTO locatorForm, UUID uuid) {
		org.hl7.fhir.r4.model.Task fhirTask = new org.hl7.fhir.r4.model.Task();

		String taskId = uuid.toString();
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
	public ServiceRequest createFhirServiceRequest(LocatorFormDTO locatorForm) {
		TravelCompanion comp = new TravelCompanion();
		comp.setDateOfBirth(locatorForm.getDateOfBirth());
		comp.setSex(locatorForm.getSex());
		comp.setFirstName(locatorForm.getFirstName());
		comp.setLastName(locatorForm.getLastName());
		comp.setMiddleInitial(locatorForm.getMiddleInitial());
		comp.setNationality(locatorForm.getNationality());
		comp.setPassportNumber(locatorForm.getPassportNumber());
		comp.setSeatNumber(locatorForm.getSeatNumber());
		return createFhirServiceRequest(comp);
	}

	@Override
	public ServiceRequest createFhirServiceRequest(TravelCompanion comp) {

		Bundle pResp = new Bundle();
		ServiceRequest serviceRequest = new ServiceRequest();

		try {
			// patient is created here and used for SR subjectRef
			UUID uuid = UUID.randomUUID();
			org.hl7.fhir.r4.model.Patient fhirPatient = createFhirPatient(comp, uuid);

			pResp = createFhirResource(fhirPatient, uuid);
			log.trace("pResp: " + fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(pResp));

			Reference subjectRef = new Reference();
			subjectRef.setReference(pResp.getEntryFirstRep().getResponse().getLocation());

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

		} catch (Exception e) {
			log.debug("FhirTransformServiceImpl:Transform exception: " + e.toString());
			e.printStackTrace();
		}

		return serviceRequest;
	}
}
