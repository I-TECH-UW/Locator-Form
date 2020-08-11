package org.itech.locator.form.webapp.fhir.service;

import org.hl7.fhir.r4.model.Bundle;

public interface FhirPersistingService {

	Bundle executeTransaction(Bundle transactionBundle);

}
