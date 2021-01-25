package org.itech.locator.form.webapp.fhir.service;

import java.util.Optional;

import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Task;

public interface FhirPersistingService {

	Bundle executeTransaction(Bundle transactionBundle);

	Optional<Task> getTaskFromServiceRequest(String serviceRequestId);

}
