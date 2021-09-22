package org.itech.locator.form.webapp.fhir.service.transform;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Location;
import org.hl7.fhir.r4.model.Patient;
import org.hl7.fhir.r4.model.Practitioner;
import org.hl7.fhir.r4.model.ServiceRequest;
import org.hl7.fhir.r4.model.Specimen;
import org.hl7.fhir.r4.model.Task;
import org.hl7.fhir.r4.model.Task.TaskStatus;
import org.itech.locator.form.webapp.api.dto.HealthDeskDTO;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.api.dto.Traveller;
import org.itech.locator.form.webapp.summary.LabelContentPair;
import org.itech.locator.form.webapp.summary.security.SummaryAccessInfo;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface FhirTransformService {

	TransactionObjects createTransactionObjects(LocatorFormDTO locatorFormDTO, TaskStatus status)
			throws JsonProcessingException;

	TransactionObjects createTransactionObjects(HealthDeskDTO locatorFormDTO, TaskStatus status)
			throws JsonProcessingException;

	public class TransactionObjects {
		public Bundle bundle;
		public Task task;
		public List<ServiceRequestObjects> serviceRequestPatientPairs = new ArrayList<>();
	}

	public class ServiceRequestObjects {
		public ServiceRequest serviceRequest;
		public Patient patient;
		public Specimen specimen;
		public Location location;
		public Practitioner practitioner;

		public ServiceRequestObjects(ServiceRequest sRequest, Patient patient, Specimen specimen, Location location,
				Practitioner practitioner) {
			this.serviceRequest = sRequest;
			this.patient = patient;
		}
	}

	Map<SummaryAccessInfo, LabelContentPair> createLabelContentPair(@Valid LocatorFormDTO locatorFormDTO);

	Patient createFhirPatient(LocatorFormDTO lfdto, Traveller comp);

	ServiceRequestObjects createFhirServiceRequestPatient(LocatorFormDTO lfdto, Traveller comp);

	Task createFhirTask(LocatorFormDTO locatorFormDTO, TaskStatus status);

}
