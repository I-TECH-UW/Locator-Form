package org.itech.locator.form.webapp.api.transform;

import java.util.UUID;

import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Resource;
import org.itech.locator.form.webapp.api.dto.FamilyTravelCompanion;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.api.dto.NonFamilyTravelCompanion;

public interface FhirServerTransformService {
    
    public Bundle CreateFhirResource(Resource resource, UUID id);

    public org.hl7.fhir.r4.model.Patient CreateFhirPatient(LocatorFormDTO locatorFormDTO);
    
    public org.hl7.fhir.r4.model.Task CreateFhirTask(LocatorFormDTO locatorFormDTO);
    
    public org.hl7.fhir.r4.model.ServiceRequest CreateFhirServiceRequest(FamilyTravelCompanion comp);
    
    public org.hl7.fhir.r4.model.ServiceRequest CreateFhirServiceRequest(NonFamilyTravelCompanion nonComp);

    public org.hl7.fhir.r4.model.ServiceRequest CreateFhirServiceRequest(LocatorFormDTO locatorForm);

}
