package org.itech.locator.form.webapp.api;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.hl7.fhir.r4.model.Reference;
import org.hl7.fhir.r4.model.StringType;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.api.dto.TravelCompanion;
import org.itech.locator.form.webapp.api.transform.FhirServerTransformService;
import org.itech.locator.form.webapp.barcode.LabelContentPair;
import org.itech.locator.form.webapp.barcode.service.BarcodeService;
import org.itech.locator.form.webapp.email.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
public class ServerController {

	@Autowired
	private FhirContext fhirContext;

	@Autowired
	protected FhirServerTransformService fhirServerTransformService;

	@Autowired
	private BarcodeService barcodeService;
	@Autowired
	private EmailService emailService;
	@Autowired
	ObjectMapper objectMapper;

	@PostMapping()
	public ResponseEntity<List<LabelContentPair>> submitForm(@RequestBody @Valid LocatorFormDTO locatorFormDTO)
			throws OutputException, BarcodeException, MessagingException, DocumentException, JsonProcessingException {
		if (!locatorFormDTO.getAcceptedTerms()) {
			return ResponseEntity.badRequest().build();
		}

		log.trace("Received: " + locatorFormDTO.toString());
		org.hl7.fhir.r4.model.Bundle srResponse = null;
		List<String> basedOn = new ArrayList<>();
		List<Reference> basedOnRef = new ArrayList<>();

		List<LabelContentPair> idAndLabels = new ArrayList<>();
		UUID taskUuid = UUID.randomUUID();
//		idAndLabels.add(new LabelContentPair("Task ID", taskUuid.toString()));

		org.hl7.fhir.r4.model.Task fhirTask = fhirServerTransformService.createFhirTask(locatorFormDTO, taskUuid);
		org.hl7.fhir.r4.model.ServiceRequest fhirServiceRequest = fhirServerTransformService
				.createFhirServiceRequest(locatorFormDTO);
		UUID uuid = UUID.randomUUID();
		srResponse = fhirServerTransformService.createFhirResource(fhirServiceRequest, uuid);
		idAndLabels.add(new LabelContentPair(locatorFormDTO.getFirstName() + "'s Service Request ID", uuid.toString()));
		log.trace("fhirSR: " + fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(srResponse));
		basedOn.add(srResponse.getEntryFirstRep().getResponse().getLocation().toString());

		for (TravelCompanion comp : locatorFormDTO.getFamilyTravelCompanions()) {

			fhirServiceRequest = fhirServerTransformService.createFhirServiceRequest(comp);
			uuid = UUID.randomUUID();
			srResponse = fhirServerTransformService.createFhirResource(fhirServiceRequest, uuid);
			basedOn.add(srResponse.getEntryFirstRep().getResponse().getLocation().toString());
			idAndLabels.add(new LabelContentPair(comp.getFirstName() + "'s Service Request ID", uuid.toString()));
		}

		for (TravelCompanion comp : locatorFormDTO.getNonFamilyTravelCompanions()) {

			fhirServiceRequest = fhirServerTransformService.createFhirServiceRequest(comp);
			uuid = UUID.randomUUID();
			srResponse = fhirServerTransformService.createFhirResource(fhirServiceRequest, uuid);
			basedOn.add(srResponse.getEntryFirstRep().getResponse().getLocation().toString());
			idAndLabels.add(new LabelContentPair(comp.getFirstName() + "'s Service Request ID", uuid.toString()));
		}

		for (String id : basedOn) {
			StringType basedOn0 = new StringType();
			Reference basedOnRef0 = new Reference();
			basedOn0.setValue(id.toString());
			basedOnRef0.setReference(basedOn0.asStringValue());
			basedOnRef0.setType("ServiceRequest");
			fhirTask.addBasedOn(basedOnRef0);
			basedOn0 = null;
			basedOnRef0 = null;
		}

		String locatorFormJSON = null;
        locatorFormJSON = objectMapper.writeValueAsString(locatorFormDTO);
		fhirTask.setDescription(locatorFormJSON);

		log.trace("fhirTask: " + fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(fhirTask));
		org.hl7.fhir.r4.model.Bundle tResponse = fhirServerTransformService.createFhirResource(fhirTask, taskUuid);
		log.trace("tResponse: " + fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(tResponse));

		Map<String, ByteArrayOutputStream> attachments = new HashMap<>();
		attachments.put("locatorFormBarcodes" + taskUuid + ".pdf",
				barcodeService.generateBarcodeFile(idAndLabels));
		emailService.sendMessageWithAttachment(locatorFormDTO.getEmail(), "Locator-Form Barcode", "Hello "
				+ locatorFormDTO.getFirstName() + ",\n\n"
				+ "Please bring the attached file (printed off or on your device) to the airport as you will need them when you land in Mauritius",
				attachments);

		return ResponseEntity.ok(idAndLabels);
	}

}
