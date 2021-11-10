package org.itech.locator.form.webapp.fhir.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Bundle.BundleEntryComponent;
import org.hl7.fhir.r4.model.Patient;
import org.hl7.fhir.r4.model.Resource;
import org.hl7.fhir.r4.model.ResourceType;
import org.hl7.fhir.r4.model.ServiceRequest;
import org.hl7.fhir.r4.model.Task;
import org.itech.locator.form.webapp.fhir.service.FhirPersistingService;
import org.itech.locator.form.webapp.fhir.service.transform.FhirTransformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FhirPersistingServiceImpl implements FhirPersistingService {

	@Value("${org.itech.locator.form.fhirstore.uri}")
	private String localFhirStorePath;

	@Value("${org.itech.locator.form.fhir.system:https://host.openelis.org/locator-form}")
	private String locatorFormFhirSystem;

	@Value("${org.itech.locator.form.fhir.system.test-kit:https://host.openelis.org/locator-form/test-kit}")
	private String testKitIdSystem;

	@Autowired
	private FhirContext fhirContext;
	@Autowired
	protected FhirTransformService fhirTransformService;

	@Override
	public Bundle executeTransaction(Bundle transactionBundle) {
		log.trace("executing transaction...");
		return getFhirClient().transaction().withBundle(transactionBundle).execute();
	}

	@Override
	public MethodOutcome executeTransaction(Resource resource) {
		return getFhirClient().update().resource(resource).withId(resource.getIdElement().getIdPart()).encodedJson()
		        .execute();
	}

	@Override
	public Optional<Task> getTaskById(String taskId) {
		//		IGenericClient fhirClient = fhirContext.newRestfulGenericClient(localFhirStorePath);
		//		return fhirClient.read().resource(Task.class).withId(taskId).execute();
		Bundle searchBundle = getFhirClient().search().forResource(Task.class).where(Task.RES_ID.exactly().code(taskId))
		        .returnBundle(Bundle.class).execute();
		for (BundleEntryComponent entry : searchBundle.getEntry()) {
			if (entry.hasResource() && ResourceType.Task.equals(entry.getResource().getResourceType())) {
				return Optional.of((Task) entry.getResource());
			}
		}
		return Optional.empty();
	}

	@Override
	public Optional<Task> getTaskFromServiceRequest(String serviceRequestId) {
		Bundle searchBundle = getFhirClient().search().forResource(Task.class)
		        .where(Task.BASED_ON.hasAnyOfIds(serviceRequestId)).returnBundle(Bundle.class).execute();
		for (BundleEntryComponent entry : searchBundle.getEntry()) {
			if (entry.hasResource() && ResourceType.Task.equals(entry.getResource().getResourceType())) {
				return Optional.of((Task) entry.getResource());
			}
		}
		return Optional.empty();
	}

	@Override
	public List<Patient> searchPatientByValue(String searchValue) {
		if (!StringUtils.isBlank(searchValue)) {
			searchValue = searchValue.toUpperCase();
		}
		List<Patient> patients = new ArrayList<>();
		IGenericClient fhirClient = getFhirClient();
		Bundle searchBundle = fhirClient.search().forResource(Patient.class)
		        .where(Patient.IDENTIFIER.exactly().code(searchValue)).returnBundle(Bundle.class).execute();
		for (BundleEntryComponent entry : searchBundle.getEntry()) {
			if (entry.hasResource() && ResourceType.Patient.equals(entry.getResource().getResourceType())) {
				patients.add((Patient) entry.getResource());
			}
		}
		searchBundle = fhirClient.search().forResource(Patient.class).where(Patient.NAME.contains().value(searchValue))
		        .returnBundle(Bundle.class).execute();
		for (BundleEntryComponent entry : searchBundle.getEntry()) {
			if (entry.hasResource() && ResourceType.Patient.equals(entry.getResource().getResourceType())) {
				patients.add((Patient) entry.getResource());
			}
		}
		return patients;
	}

	@Override
	public Optional<ServiceRequest> getServiceRequestForPatient(Patient patient) {
		Bundle searchBundle = getFhirClient().search().forResource(ServiceRequest.class)
		        .where(ServiceRequest.PATIENT.hasId(patient.getIdElement().getIdPart())).returnBundle(Bundle.class)
		        .execute();
		for (BundleEntryComponent entry : searchBundle.getEntry()) {
			if (entry.hasResource() && ResourceType.ServiceRequest.equals(entry.getResource().getResourceType())) {
				return Optional.of((ServiceRequest) entry.getResource());
			}
		}
		return Optional.empty();
	}

	@Override
	public List<ServiceRequest> getServiceRequestsForPatients(List<Patient> patients) {
		List<ServiceRequest> serviceRequests = new ArrayList<>();
		if (patients.size() > 0) {
			Bundle searchBundle = getFhirClient().search().forResource(ServiceRequest.class)
			        .where(ServiceRequest.PATIENT.hasAnyOfIds(
			            patients.stream().map(e -> e.getIdElement().getIdPart()).collect(Collectors.toList())))
			        .returnBundle(Bundle.class).execute();
			for (BundleEntryComponent entry : searchBundle.getEntry()) {
				if (entry.hasResource() && ResourceType.ServiceRequest.equals(entry.getResource().getResourceType())) {
					serviceRequests.add((ServiceRequest) entry.getResource());
				}
			}
		}
		return serviceRequests;
	}

	@Override
	public Optional<Patient> getPatientFromServiceRequest(String testKitId) {
		Bundle searchBundle = getFhirClient().search().forResource(ServiceRequest.class)
				.where(ServiceRequest.IDENTIFIER.exactly().systemAndValues(testKitIdSystem, testKitId))
				.include(ServiceRequest.INCLUDE_PATIENT).returnBundle(Bundle.class).execute();
		for (BundleEntryComponent entry : searchBundle.getEntry()) {
			if (entry.hasResource() && ResourceType.Patient.equals(entry.getResource().getResourceType())) {
				return Optional.of((Patient) entry.getResource());
			}
		}
		return Optional.empty();
	}

	private IGenericClient getFhirClient() {
		return fhirContext.newRestfulGenericClient(localFhirStorePath);
	}
}
