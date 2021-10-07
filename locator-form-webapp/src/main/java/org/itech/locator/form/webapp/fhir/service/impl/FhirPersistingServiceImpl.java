package org.itech.locator.form.webapp.fhir.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Bundle.BundleEntryComponent;
import org.hl7.fhir.r4.model.Patient;
import org.hl7.fhir.r4.model.ResourceType;
import org.hl7.fhir.r4.model.ServiceRequest;
import org.hl7.fhir.r4.model.Task;
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
		return fhirClient.transaction().withBundle(transactionBundle).execute();
	}

	@Override
	public Optional<Task> getTaskById(String taskId) {
//		IGenericClient fhirClient = fhirContext.newRestfulGenericClient(localFhirStorePath);
//		return fhirClient.read().resource(Task.class).withId(taskId).execute();
		IGenericClient fhirClient = fhirContext.newRestfulGenericClient(localFhirStorePath);
		Bundle searchBundle = fhirClient.search().forResource(Task.class).where(Task.RES_ID.exactly().code(taskId))
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
		IGenericClient fhirClient = fhirContext.newRestfulGenericClient(localFhirStorePath);
		Bundle searchBundle = fhirClient.search().forResource(Task.class)
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
		List<Patient> patients = new ArrayList<>();
		IGenericClient fhirClient = fhirContext.newRestfulGenericClient(localFhirStorePath);
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
		IGenericClient fhirClient = fhirContext.newRestfulGenericClient(localFhirStorePath);
		Bundle searchBundle = fhirClient.search().forResource(ServiceRequest.class)
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
			IGenericClient fhirClient = fhirContext.newRestfulGenericClient(localFhirStorePath);
			Bundle searchBundle = fhirClient.search().forResource(ServiceRequest.class)
					.where(ServiceRequest.PATIENT
							.hasAnyOfIds(patients.stream().map(e -> e.getIdElement().getIdPart())
									.collect(Collectors.toList())))
					.returnBundle(Bundle.class).execute();
			for (BundleEntryComponent entry : searchBundle.getEntry()) {
				if (entry.hasResource() && ResourceType.ServiceRequest.equals(entry.getResource().getResourceType())) {
					serviceRequests.add((ServiceRequest) entry.getResource());
				}
			}
		}
		return serviceRequests;
	}

}
