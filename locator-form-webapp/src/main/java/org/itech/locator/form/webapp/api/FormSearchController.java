package org.itech.locator.form.webapp.api;

import java.util.Optional;

import javax.mail.MessagingException;

import org.hl7.fhir.r4.model.Task;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.fhir.service.FhirPersistingService;
import org.itech.locator.form.webapp.fhir.service.transform.FhirTransformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.text.DocumentException;

import lombok.extern.slf4j.Slf4j;
import net.sourceforge.barbecue.BarcodeException;
import net.sourceforge.barbecue.output.OutputException;

@RestController
@RequestMapping("/formsearch")
@Slf4j
public class FormSearchController {

	@Autowired
	protected FhirPersistingService fhirPersistingService;
	@Autowired
	protected FhirTransformService fhirTransformService;
	@Autowired
	private ObjectMapper objectMapper;

	@GetMapping("/{serviceRequestId}")
	public ResponseEntity<LocatorFormDTO> searchByServiceRequestId(@PathVariable String serviceRequestId)
			throws OutputException, BarcodeException, MessagingException, DocumentException, JsonProcessingException {

		log.trace("Received: " + serviceRequestId);
		Optional<Task> serviceRequest = fhirPersistingService.getTaskFromServiceRequest(serviceRequestId);
		if (serviceRequest.isPresent()) {
			LocatorFormDTO locatorFormDTO = objectMapper.readValue(serviceRequest.get().getDescription(),
					LocatorFormDTO.class);
			return ResponseEntity.ok(locatorFormDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
