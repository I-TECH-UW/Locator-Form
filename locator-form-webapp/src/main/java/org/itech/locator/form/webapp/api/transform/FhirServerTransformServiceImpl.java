package org.itech.locator.form.webapp.api.transform;

import java.util.ArrayList;
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
import org.itech.locator.form.webapp.api.dto.FamilyTravelCompanion;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.api.dto.NonFamilyTravelCompanion;
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
    
    IGenericClient localFhirClient; 
    
    @PostConstruct
    public void instantiateLocalFhirClient() {
        localFhirClient = fhirContext.newRestfulGenericClient(localFhirStorePath);
    }
    
    public Bundle CreateFhirResource(Resource resource, UUID id) {
        log.debug("FhirServerTransformServiceImpl:CreateFhirResource: " + 
                resource.getResourceType() + " " +
                id.toString()
        );
        Bundle bundle = new Bundle();
        Bundle resp = new Bundle();
        Identifier identifier = new Identifier();
        String resourceType = resource.getResourceType().toString();
//        resource.setId(IdType.newRandomUuid());
//        resource.setIdElement(IdType.newRandomUuid());
        identifier.setSystem(resource.getId());
        resource.castToIdentifier(identifier);
        
        try {
            
            bundle.addEntry()
                    .setFullUrl(resource.getIdElement().getValue())
                    .setResource(resource).getRequest().setUrl(resourceType + "/" + id).setMethod(Bundle.HTTPVerb.PUT);
            
//            log.debug("CreateFhirResource: " + fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(bundle));    
            
            resp = localFhirClient.transaction().withBundle(bundle).execute();
        } catch (Exception e) {
            log.debug("FhirServerTransformServiceImpl:Transform exception: " + e.toString());
            e.printStackTrace();
        }
        return resp;
    }
    
   
    public org.hl7.fhir.r4.model.Patient CreateFhirPatient(FamilyTravelCompanion comp) {
        LocatorFormDTO locatorFormDTO = new LocatorFormDTO();
        locatorFormDTO.setFirstName(comp.getFirstName());
        locatorFormDTO.setLastName(comp.getLastName());
        locatorFormDTO.setNationality(comp.getNationality());
        locatorFormDTO.setPassportNumber(comp.getPassportNumber());
        locatorFormDTO.setGender(comp.getGender());
        
        return CreateFhirPatient(locatorFormDTO);
    }
    
    public org.hl7.fhir.r4.model.Patient CreateFhirPatient(LocatorFormDTO locatorForm) {
        org.hl7.fhir.r4.model.Patient fhirPatient = new org.hl7.fhir.r4.model.Patient();
        
        HumanName humanName = new HumanName();
        List<HumanName> humanNameList = new ArrayList<HumanName>();
        humanName.setFamily(locatorForm.getLastName());
        humanName.addGiven(locatorForm.getFirstName());
        humanNameList.add(humanName);
        fhirPatient.setName(humanNameList);
        
        //fhirPatient.setBirthDate(patient.getBirthDate());
        if (locatorForm.getGender().equalsIgnoreCase("male")) {
            fhirPatient.setGender(AdministrativeGender.MALE);
        } else {
            fhirPatient.setGender(AdministrativeGender.FEMALE);
        } 
        
        return fhirPatient;
    }

    @Override
    public Task CreateFhirTask(LocatorFormDTO locatorForm) {
        org.hl7.fhir.r4.model.Task fhirTask = new org.hl7.fhir.r4.model.Task();
        
      String taskId = locatorForm.getId().toString();
      Identifier identifier = new Identifier();
      identifier.setId(taskId);
      identifier.setSystem("LocatorForm/TaskId"); // fix hardcode
      List<Identifier> identifierList = new ArrayList<Identifier>();
      identifierList.add(identifier);
      
      fhirTask.setIdentifier(identifierList);
      
      return fhirTask;
    }
    
    @Override
    public ServiceRequest CreateFhirServiceRequest(LocatorFormDTO locatorForm) {
        FamilyTravelCompanion comp = new FamilyTravelCompanion();
        comp.setDateOfBirth(locatorForm.getDateOfBirth());
        comp.setGender(locatorForm.getGender());
        comp.setFirstName(locatorForm.getFirstName());
        comp.setLastName(locatorForm.getLastName());
        comp.setMiddleInitial(locatorForm.getMiddleInitial());
        comp.setNationality(locatorForm.getNationality());
        comp.setPassportNumber(locatorForm.getPassportNumber());
        comp.setSeatNumber(locatorForm.getSeatNumber());
        return CreateFhirServiceRequest(comp);
    }
    
    @Override
    public ServiceRequest CreateFhirServiceRequest(NonFamilyTravelCompanion nonComp) {
        FamilyTravelCompanion comp = new FamilyTravelCompanion();
        comp.setDateOfBirth(nonComp.getDateOfBirth());
        comp.setGender(nonComp.getGender());
        comp.setFirstName(nonComp.getFirstName());
        comp.setLastName(nonComp.getLastName());
        comp.setMiddleInitial(nonComp.getMiddleInitial());
        comp.setNationality(nonComp.getNationality());
        comp.setPassportNumber(nonComp.getPassportNumber());
        comp.setSeatNumber(nonComp.getSeatNumber());
        return CreateFhirServiceRequest(comp);
    }

    @Override
    public ServiceRequest CreateFhirServiceRequest(FamilyTravelCompanion comp) {
      
      Bundle pResp = new Bundle();
      ServiceRequest serviceRequest = new ServiceRequest();
      
      try {
          
          Reference subjectRef = new Reference();
          
          org.hl7.fhir.r4.model.Patient fhirPatient = CreateFhirPatient(comp);
          pResp = CreateFhirResource(fhirPatient, UUID.randomUUID());
//          log.debug("pResp: " + fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(pResp));
          subjectRef.setReference(pResp.getEntryFirstRep().getResponse().getLocation());
          
          CodeableConcept codeableConcept = new CodeableConcept();
          List<Coding> codingList = new ArrayList<Coding>();
          Coding coding0 = new Coding();
          coding0.setCode("covid loinc");
          coding0.setSystem("http://loinc.org");
          codingList.add(coding0);
          
          coding0 = null;
          
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
    

//	@Override
//	public Iterable<FhirServerDTO> getAsDTO(Iterable<FhirServer> fhirServers) {
//		List<FhirServerDTO> fhirServerDTOs = new ArrayList<>();
//		for (FhirServer fhirServer : fhirServers) {
//			fhirServerDTOs.add(getAsDTO(fhirServer));
//		}
//		return fhirServerDTOs;
//	}

//	@Override
//	@Transactional(readOnly = true)
//	public FhirServerDTO getAsDTO(FhirServer fhirServer) {
//
//	    // test comment 
//		FhirServerDTO fhirServerDTO = new FhirServerDTO();
//		fhirServerDTO.setId(fhirServer.getId());
//		fhirServerDTO.setName(fhirServer.getName());
//		fhirServerDTO.setUri(fhirServer.getUri());
//		fhirServerDTO.setCode(fhirServer.getCode());
//		fhirServerDTO.setLastCheckedIn(fhirServer.getLastCheckedIn());
//		fhirServerDTO.setRegistered(fhirServer.getRegistered());
//
//		return fhirServerDTO;
//	}

}
