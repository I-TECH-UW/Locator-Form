package org.itech.locator.form.webapp.fhir.service.impl;

import org.hl7.fhir.r4.model.Bundle;
import org.itech.locator.form.webapp.fhir.service.FhirPersistingService;
import org.itech.locator.form.webapp.fhir.service.transform.FhirTransformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FhirPersistingServiceImpl implements FhirPersistingService {

	@Value("${org.itech.locator.form.fhirstore.uri}")
	private String localFhirStorePath;

	@Autowired
	private FhirContext fhirContext;
	@Autowired
	protected FhirTransformService fhirTransformService;

	@Override
	public Bundle executeTransaction(Bundle transactionBundle) {
		log.trace("executing transaction...");
		IGenericClient fhirClient = fhirContext.newRestfulGenericClient(localFhirStorePath);
		return fhirClient.transaction().withBundle(transactionBundle).encodedJson().execute();
	}

}
