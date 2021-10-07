package org.itech.locator.form.webapp.api;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Task.TaskStatus;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.email.service.EmailService;
import org.itech.locator.form.webapp.fhir.service.FhirPersistingService;
import org.itech.locator.form.webapp.fhir.service.transform.FhirTransformService;
import org.itech.locator.form.webapp.fhir.service.transform.FhirTransformService.TransactionObjects;
import org.itech.locator.form.webapp.summary.LabelContentPair;
import org.itech.locator.form.webapp.summary.security.SummaryAccessInfo;
import org.itech.locator.form.webapp.summary.service.SummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
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
	private FhirContext fhirContext;

	@PostMapping
	public ResponseEntity<List<SummaryAccessInfo>> submitForm(@RequestBody @Valid LocatorFormDTO locatorFormDTO,
			BindingResult result)
			throws OutputException, BarcodeException, MessagingException, DocumentException, JsonProcessingException {
		if (result.hasErrors()) {
			return ResponseEntity.badRequest().build();
		}
		if (!locatorFormDTO.getAcceptedTerms()) {
			return ResponseEntity.badRequest().build();
		}

		log.trace("Received: " + locatorFormDTO.toString());
		TransactionObjects transactionObjects = fhirTransformService.createTransactionObjects(locatorFormDTO, true,
				TaskStatus.DRAFT);
		Bundle transactionResponseBundle = fhirPersistingService.executeTransaction(transactionObjects.bundle);
		log.trace("fhirTransactionResponse: "
				+ fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(transactionResponseBundle));

		// no further changes to locator form should happen at this point, or the
		// summary access token will become invalid
		Map<SummaryAccessInfo, LabelContentPair> idAndLabels = fhirTransformService
				.createLabelContentPair(locatorFormDTO);
		Map<String, ByteArrayOutputStream> attachments = new HashMap<>();
		attachments.put("locatorFormBarcodes" + transactionObjects.task.getIdElement().getIdPart() + ".pdf",
				barcodeService.generateSummaryFile(idAndLabels.entrySet().stream()
						.collect(Collectors.toMap(e -> e.getKey().getId(), e -> e.getValue())), locatorFormDTO));
		emailService.sendMessageWithAttachment(locatorFormDTO.getEmail(), "Locator-Form Barcode", "Hello "
				+ locatorFormDTO.getFirstName() + ",\n\n"
				+ "Please bring a printed copy of the attached file to the Airport of Mauritius as you will need them when you land in Mauritius",
				attachments);
		return ResponseEntity.ok(new ArrayList<>(idAndLabels.keySet()));
	}

}
