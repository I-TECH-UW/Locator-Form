package org.itech.locator.form.webapp.api.transform;

import java.util.UUID;

import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Resource;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.api.dto.TravelCompanion;

public interface FhirServerTransformService {

    public Bundle createFhirResource(Resource resource, UUID id);

    public org.hl7.fhir.r4.model.Patient createFhirPatient(LocatorFormDTO locatorFormDTO, UUID uuid);

	public org.hl7.fhir.r4.model.Task createFhirTask(LocatorFormDTO locatorFormDTO, UUID taskUuid);

    public org.hl7.fhir.r4.model.ServiceRequest createFhirServiceRequest(TravelCompanion comp);

    public org.hl7.fhir.r4.model.ServiceRequest createFhirServiceRequest(LocatorFormDTO locatorForm);

}
