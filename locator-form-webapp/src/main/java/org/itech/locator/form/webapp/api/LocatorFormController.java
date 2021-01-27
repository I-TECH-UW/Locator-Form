package org.itech.locator.form.webapp.api;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.hl7.fhir.r4.model.Bundle;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.barcode.LabelContentPair;
import org.itech.locator.form.webapp.barcode.service.SummaryService;
import org.itech.locator.form.webapp.email.service.EmailService;
import org.itech.locator.form.webapp.fhir.service.FhirPersistingService;
import org.itech.locator.form.webapp.fhir.service.transform.FhirTransformService;
import org.itech.locator.form.webapp.fhir.service.transform.FhirTransformService.TransactionObjects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.text.DocumentException;

import ca.uhn.fhir.context.FhirContext;
import lombok.extern.slf4j.Slf4j;
import net.sourceforge.barbecue.BarcodeException;
import net.sourceforge.barbecue.output.OutputException;

@RestController
@RequestMapping("/locator-form")
@Slf4j
public class LocatorFormController {

	@Autowired
	protected FhirPersistingService fhirPersistingService;
	@Autowired
	protected FhirTransformService fhirTransformService;
	@Autowired
	private SummaryService barcodeService;
	@Autowired
	private EmailService emailService;
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private FhirContext fhirContext;

	@PostMapping()
	public ResponseEntity<Map<String, LabelContentPair>> submitForm(@RequestBody @Valid LocatorFormDTO locatorFormDTO,
			BindingResult result)
			throws OutputException, BarcodeException, MessagingException, DocumentException, JsonProcessingException {
		if (result.hasErrors()) {
			return ResponseEntity.badRequest().build();
		}
		if (!locatorFormDTO.getAcceptedTerms()) {
			return ResponseEntity.badRequest().build();
		}

		log.trace("Received: " + locatorFormDTO.toString());
		TransactionObjects transactionObjects = fhirTransformService.createTransactionObjects(locatorFormDTO);
		Bundle transactionResponseBundle = fhirPersistingService.executeTransaction(transactionObjects.bundle);
		log.trace("fhirTransactionResponse: "
				+ fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(transactionResponseBundle));

		Map<String, LabelContentPair> idAndLabels = fhirTransformService.createLabelContentPair(transactionObjects);
		Map<String, ByteArrayOutputStream> attachments = new HashMap<>();
		attachments.put("locatorFormBarcodes" + transactionObjects.task.getIdElement().getIdPart() + ".pdf",
				barcodeService.generateSummaryFile(idAndLabels, locatorFormDTO));
		emailService.sendMessageWithAttachment(locatorFormDTO.getEmail(), "Locator-Form Barcode", "Hello "
				+ locatorFormDTO.getFirstName() + ",\n\n"
				+ "Please bring a printed copy of the attached file to the Airport of Mauritius as you will need them when you land in Mauritius",
				attachments);
		return ResponseEntity.ok(idAndLabels);
	}

	@PostMapping("/summarize")
	public ResponseEntity<byte[]> getSummaryPDF(@RequestBody @Valid LocatorFormDTO locatorFormDTO)
			throws OutputException, BarcodeException, MessagingException, DocumentException, JsonProcessingException {
		if (!locatorFormDTO.getAcceptedTerms()) {
			return ResponseEntity.badRequest().build();
		}

		log.trace("Received: " + locatorFormDTO.toString());
		Map<String, LabelContentPair> idAndLabels = fhirTransformService.createLabelContentPair(locatorFormDTO);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_PDF);
		return ResponseEntity.ok() //
				.headers(headers) //
				.body(barcodeService.generateSummaryFile(idAndLabels, locatorFormDTO).toByteArray());
	}

	@GetMapping("/summary/{serviceRequestId}")
	public ResponseEntity<byte[]> getSummaryPDFByIds(@PathVariable("serviceRequestId") String serviceRequestId)
			throws OutputException, BarcodeException, MessagingException, DocumentException, JsonProcessingException {
		log.trace("Received: " + serviceRequestId);
		LocatorFormDTO locatorFormDTO = objectMapper.readValue(
				fhirPersistingService.getTaskFromServiceRequest(serviceRequestId).orElseThrow().getDescription(),
				LocatorFormDTO.class);
		Map<String, LabelContentPair> idAndLabels = fhirTransformService.createLabelContentPair(locatorFormDTO);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_PDF);
		return ResponseEntity.ok() //
				.headers(headers) //
				.body(barcodeService.generateSummaryFile(idAndLabels, locatorFormDTO).toByteArray());
	}

}
