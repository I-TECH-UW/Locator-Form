package org.itech.locator.form.webapp.fhir.service.transform;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Patient;
import org.hl7.fhir.r4.model.ServiceRequest;
import org.hl7.fhir.r4.model.Task;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.api.dto.Traveller;
import org.itech.locator.form.webapp.summary.LabelContentPair;
import org.itech.locator.form.webapp.summary.security.SummaryAccessInfo;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface FhirTransformService {

	TransactionObjects createTransactionObjects(LocatorFormDTO locatorFormDTO) throws JsonProcessingException;

	Task createFhirTask();

	public class TransactionObjects {
		public Bundle bundle;
		public Task task;
		public List<ServiceRequestPatientPair> serviceRequestPatientPairs = new ArrayList<>();
	}

	public class ServiceRequestPatientPair {
		public ServiceRequest serviceRequest;
		public Patient patient;

		public ServiceRequestPatientPair(ServiceRequest sRequest, Patient patient) {
			this.serviceRequest = sRequest;
			this.patient = patient;
		}
	}

	Map<SummaryAccessInfo, LabelContentPair> createLabelContentPair(@Valid LocatorFormDTO locatorFormDTO);

	Patient createFhirPatient(LocatorFormDTO lfdto, Traveller comp);

	ServiceRequestPatientPair createFhirServiceRequestPatient(LocatorFormDTO lfdto, Traveller comp);

}
