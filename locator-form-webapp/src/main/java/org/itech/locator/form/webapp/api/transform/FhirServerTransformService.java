package org.itech.locator.form.webapp.api.transform;

import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Resource;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;

public interface FhirServerTransformService {
    
    public Bundle CreateFhirResource(Resource resource);

    public org.hl7.fhir.r4.model.Patient CreateFhirPatient(LocatorFormDTO locatorFormDTO);

}
