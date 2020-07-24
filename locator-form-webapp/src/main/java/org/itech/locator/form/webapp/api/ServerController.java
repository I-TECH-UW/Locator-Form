package org.itech.locator.form.webapp.api;

import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.api.transform.FhirServerTransformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/locator-form")
@Slf4j
public class ServerController {
    
    @Autowired
    protected FhirServerTransformService fhirServerTransformService;
    
    @PostMapping()
    public String submitForm(@RequestBody LocatorFormDTO locatorFormDTO) {
       
        log.debug("Received: " + locatorFormDTO.toString());
        log.debug("firstName: " + locatorFormDTO.getFirstName().toString());
        log.debug("lastName: " + locatorFormDTO.getLastName().toString());
        log.debug("email: " + locatorFormDTO.getEmail().toString());
        
        org.hl7.fhir.r4.model.Patient fhirPatient = fhirServerTransformService.CreateFhirPatient(locatorFormDTO);
        log.debug("fhirPatient: " + fhirPatient.toString());
        org.hl7.fhir.r4.model.Bundle pResponse= fhirServerTransformService.CreateFhirResource(fhirPatient);
        log.debug("pResponse: " + pResponse.getId());
        
        return "Return string";
    }
}
