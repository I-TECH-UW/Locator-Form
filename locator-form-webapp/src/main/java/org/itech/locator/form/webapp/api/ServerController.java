package org.itech.locator.form.webapp.api;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hl7.fhir.r4.model.Reference;
import org.hl7.fhir.r4.model.StringType;
import org.itech.locator.form.webapp.api.dto.FamilyTravelCompanion;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.api.dto.NonFamilyTravelCompanion;
import org.itech.locator.form.webapp.api.transform.FhirServerTransformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.uhn.fhir.context.FhirContext;
import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/locator-form")
@Slf4j
public class ServerController {
    
    @Autowired
    private FhirContext fhirContext;
    
    @Autowired
    protected FhirServerTransformService fhirServerTransformService;
    
    @PostMapping()
    public String submitForm(@RequestBody LocatorFormDTO locatorFormDTO) {
       
//        log.debug("Received: " + locatorFormDTO.toString());
        org.hl7.fhir.r4.model.Bundle srResponse= null;
        List<String> basedOn = new ArrayList<String>();
        List<Reference> basedOnRef = new ArrayList<Reference>();
        
       
        
        org.hl7.fhir.r4.model.Task fhirTask = fhirServerTransformService.CreateFhirTask(locatorFormDTO);
        org.hl7.fhir.r4.model.ServiceRequest fhirServiceRequest = fhirServerTransformService.CreateFhirServiceRequest(locatorFormDTO);
        srResponse= fhirServerTransformService.CreateFhirResource(fhirServiceRequest, UUID.randomUUID());
//        log.debug("fhirSR: " + fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(srResponse));
        basedOn.add(srResponse.getEntryFirstRep().getResponse().getLocation().toString());
       
        for (FamilyTravelCompanion comp : locatorFormDTO.getFamilyTravelCompanions()) {
            
            fhirServiceRequest = fhirServerTransformService.CreateFhirServiceRequest(comp);
            srResponse = fhirServerTransformService.CreateFhirResource(fhirServiceRequest, UUID.randomUUID());
            basedOn.add(srResponse.getEntryFirstRep().getResponse().getLocation().toString());
        }
        
        for (NonFamilyTravelCompanion comp : locatorFormDTO.getNonFamilyTravelCompanions()) {
            
            fhirServiceRequest = fhirServerTransformService.CreateFhirServiceRequest(comp);
            srResponse = fhirServerTransformService.CreateFhirResource(fhirServiceRequest, UUID.randomUUID());
            basedOn.add(srResponse.getEntryFirstRep().getResponse().getLocation().toString());
        }
    
        
        for (String  id : basedOn) {
            StringType basedOn0 = new StringType();
            Reference basedOnRef0 = new Reference();
            basedOn0.setValue(id.toString());
            basedOnRef0.setReference(basedOn0.asStringValue());
            basedOnRef0.setType("ServiceRequest");
            fhirTask.addBasedOn(basedOnRef0);
            basedOn0 = null;
            basedOnRef0 = null;
        }
        
        fhirTask.setDescription(locatorFormDTO.toString());
        
        log.debug("fhirTask: " + fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(fhirTask));
        org.hl7.fhir.r4.model.Bundle tResponse = fhirServerTransformService.CreateFhirResource(fhirTask, locatorFormDTO.getId());
        
        return "Return string";
    }
}
