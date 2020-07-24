package org.itech.locator.form.webapp.api.transform;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Enumerations.AdministrativeGender;
import org.hl7.fhir.r4.model.HumanName;
import org.hl7.fhir.r4.model.Identifier;
import org.hl7.fhir.r4.model.Resource;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
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
    
    public Bundle CreateFhirResource(Resource resource) {
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
                    .setResource(resource).getRequest().setUrl(resourceType + "/" + UUID.randomUUID()).setMethod(Bundle.HTTPVerb.PUT);
            
            log.debug("CreateFhirResource: " + fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(bundle));    
            
            resp = localFhirClient.transaction().withBundle(bundle).execute();
        } catch (Exception e) {
            log.debug("FhirServerTransformServiceImpl:Transform exception: " + e.toString());
            e.printStackTrace();
        }
        return resp;
    }
    
   
    
    public org.hl7.fhir.r4.model.Patient CreateFhirPatient(LocatorFormDTO locatorForm) {
        org.hl7.fhir.r4.model.Patient fhirPatient = new org.hl7.fhir.r4.model.Patient();
        
//        String subjectNumber = null;
//        Identifier identifier = new Identifier();
//        identifier.setId(subjectNumber);
//        identifier.setSystem("OpenELIS-Global/SubjectNumber"); // fix hardcode
//        List<Identifier> identifierList = new ArrayList<Identifier>();
//        identifierList.add(identifier);
//        fhirPatient.setIdentifier(identifierList);
        
        HumanName humanName = new HumanName();
        List<HumanName> humanNameList = new ArrayList<HumanName>();
        humanName.setFamily(locatorForm.getLastName());
        humanName.addGiven(locatorForm.getFirstName());
        humanNameList.add(humanName);
        fhirPatient.setName(humanNameList);
        
        //fhirPatient.setBirthDate(patient.getBirthDate());
        if (locatorForm.getSex().equalsIgnoreCase("male")) {
            fhirPatient.setGender(AdministrativeGender.MALE);
        } else {
            fhirPatient.setGender(AdministrativeGender.FEMALE);
        }

        return fhirPatient;
    }
    
//    @Override
//    public String CreateFhirFromOESample(SamplePatientUpdateData updateData, PatientManagementUpdate patientUpdate,
//            PatientManagementInfo patientInfo, SamplePatientEntryForm form, HttpServletRequest request) {
//        
//        System.out.println("CreateFhirFromOESample:add Order:accession#: " + updateData.getAccessionNumber());
//
//        fhirPatient = CreateFhirPatientFromOEPatient(patientInfo);
//        
//        Bundle srBundle = new Bundle();
//        Bundle pResp = new Bundle();
//        Bundle srResp = new Bundle();
//        ServiceRequest serviceRequest = new ServiceRequest();
//        CodeableConcept codeableConcept = new CodeableConcept();
//        List<Coding> codingList = new ArrayList<Coding>();
//        
//        List<SampleTestCollection> sampleTestCollectionList = updateData.getSampleItemsTests();
//        for (SampleTestCollection sampleTestCollection : sampleTestCollectionList) {
//            for (Test test : sampleTestCollection.tests) {
//                test = testService.get(test.getId());
//                Coding coding = new Coding();
//                coding.setCode(test.getLoinc());
//                coding.setSystem("http://loinc.org");
//                codingList.add(coding);
//            }
//        }
//        
//        Coding labCoding = new Coding();
//        labCoding.setCode(updateData.getAccessionNumber());
//        labCoding.setSystem("OpenELIS-Global/Lab No");
//        codingList.add(labCoding);
//        codeableConcept.setCoding(codingList);
//        
//        try {
//            // check for patient existence
//            Bundle pBundle = (Bundle) localFhirClient.search().forResource(org.hl7.fhir.r4.model.Patient.class)
//                    .where(new TokenClientParam("identifier").exactly().code(fhirPatient.getIdentifierFirstRep().getValue()))
//                    .prettyPrint().execute();
//
//            Reference subjectRef = new Reference();
//            
//            if (pBundle.getEntry().size() == 0) {
////                pOutcome = localFhirClient.create().resource(fhirPatient).execute();
//                pResp = CreateFhirResource(fhirPatient);
//                System.out.println("pResp:" + fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(pResp));
//                subjectRef.setReference("Patient/" + pResp.getEntryFirstRep().getResponse().getLocation());
//            } else {
//                BundleEntryComponent bundleComponent = pBundle.getEntryFirstRep();
//                org.hl7.fhir.r4.model.Patient existingPatient = (org.hl7.fhir.r4.model.Patient) bundleComponent.getResource();
//                subjectRef.setReference(existingPatient.getResourceType() + "/" + existingPatient.getIdElement().getIdPart());
//            }
//            
//            srBundle = (Bundle) localFhirClient.search().forResource(ServiceRequest.class)
//                    .where(new TokenClientParam("code").exactly().code(updateData.getAccessionNumber()))
//                    .prettyPrint()
//                    .execute();
//
//            if (srBundle.getEntry().size() == 0) {
//                serviceRequest.setCode(codeableConcept);
//                serviceRequest.setSubject(subjectRef);
////                srOutcome = localFhirClient.create().resource(serviceRequest).execute();
//                srResp = CreateFhirResource(serviceRequest);
//                System.out.println("srResp:" + fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(srResp));
//            }
//        } catch (Exception e) {
//            System.out.println("FhirTransformServiceImpl:Transform exception: " + e.toString());
//            e.printStackTrace();
//        }
//        return null;
//    }
//    

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
