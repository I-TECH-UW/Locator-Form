package org.itech.locator.form.webapp.barcode.service.impl;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Objects;

import org.apache.commons.lang3.StringUtils;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.api.dto.Traveller;
import org.itech.locator.form.webapp.barcode.LabelContentPair;
import org.itech.locator.form.webapp.barcode.service.SummaryService;
import org.springframework.stereotype.Service;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.Barcode128;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import net.sourceforge.barbecue.BarcodeException;
import net.sourceforge.barbecue.output.OutputException;

@Service
public class SummaryServiceImpl implements SummaryService {

	@Override
	public ByteArrayOutputStream generateBarcodeFile(String barcodeLabel, String barcodeContent)
			throws OutputException, BarcodeException, DocumentException {
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		Document document = new Document(new Rectangle(PageSize.LETTER));
		PdfWriter writer = PdfWriter.getInstance(document, stream);
		document.open();
		Font font = FontFactory.getFont(FontFactory.COURIER, 16, BaseColor.BLACK);
		Chunk chunk = new Chunk(barcodeLabel, font);
		document.add(chunk);
		Barcode128 code128 = new Barcode128();
		code128.setGenerateChecksum(true);
		code128.setCode(barcodeContent);
		document.add(code128.createImageWithBarcode(writer.getDirectContent(), null, null));
		document.close();
		writer.close();

		return stream;
	}

	@Override
	public ByteArrayOutputStream generateSummaryFile(List<LabelContentPair> barcodeContentToLabel,
			LocatorFormDTO dto)
			throws OutputException, BarcodeException, DocumentException {
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		Document document = new Document(new Rectangle(PageSize.LETTER));
		document.addTitle("Locator-Form Barcodes");
		PdfWriter writer = PdfWriter.getInstance(document, stream);
		document.open();
		PdfPTable table = new PdfPTable(4);
		table.setWidthPercentage(100);
		Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		PdfPCell hcell;
		hcell = new PdfPCell(new Phrase("Traveller ", headFont));
		hcell.setColspan(4);
		table.addCell(hcell);

		hcell = new PdfPCell(
				new Phrase("Passenger Type: " + Objects.toString(dto.getTravellerType(), "")));
		hcell.setColspan(4);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Flight Information ", headFont));
		hcell.setColspan(4);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Airline: " + Objects.toString(dto.getAirlineName(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Flight: " + Objects.toString(dto.getFlightNumber(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Seat: " + Objects.toString(dto.getSeatNumber(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Date Of Arrival: " + Objects.toString(dto.getArrivalDate(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Personal Information ", headFont));
		hcell.setColspan(4);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Title: " + Objects.toString(dto.getTitle(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Last (Family) Name: " + Objects.toString(dto.getLastName(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("First (Given) Name: " + Objects.toString(dto.getFirstName(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Middle Initial: " + Objects.toString(dto.getMiddleInitial(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Sex: " + Objects.toString(dto.getSex(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Date Of Birth: " + Objects.toString(dto.getDateOfBirth(), "")));
		hcell.setColspan(3);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Health Information ", headFont));
		hcell.setColspan(4);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase(
				"Proposed Length of Stay in Mauritius (days): " + Objects.toString(dto.getLengthOfStay(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase(
				"Countries visited during last 6 months: " + StringUtils.join(dto.getCountriesVisited(), ", ")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(
				new Phrase("Port Of Embarkation: " + Objects.toString(dto.getPortOfEmbarkation(), "")));
		hcell.setColspan(2);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Are you suffering from? ", headFont));
		hcell.setColspan(4);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Fever: " + Objects.toString(dto.getFever(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Sore Throat: " + Objects.toString(dto.getSoreThroat(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Joint Pain: " + Objects.toString(dto.getJointPain(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Cough: " + Objects.toString(dto.getCough(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(
				new Phrase("Breathing Difficulties: " + Objects.toString(dto.getBreathingDifficulties(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Rash: " + Objects.toString(dto.getRash(), "")));
		hcell.setColspan(3);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Contact Info ", headFont));
		hcell.setColspan(4);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Purpose of Visit: " + Objects.toString(dto.getVisitPurpose(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Mobile Phone: " + Objects.toString(dto.getMobilePhone(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Fixed Phone" + Objects.toString(dto.getFixedPhone(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Email Address: " + Objects.toString(dto.getEmail(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Nationality: " + Objects.toString(dto.getNationality(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Passport Number: " + Objects.toString(dto.getPassportNumber(), "")));
		hcell.setColspan(3);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Permanent Address ", headFont));
		hcell.setColspan(4);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase(
				"Number and Street: " + Objects.toString(dto.getPermanentAddress().getNumberAndStreet(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase(
				"Apartment Number: " + Objects.toString(dto.getPermanentAddress().getApartmentNumber(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("City: " + Objects.toString(dto.getPermanentAddress().getCity(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase(
				"State/Province: " + Objects.toString(dto.getPermanentAddress().getStateProvince(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(
				new Phrase("Country: " + Objects.toString(dto.getPermanentAddress().getCountry(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase(
				"Zip/Postal Code: " + Objects.toString(dto.getPermanentAddress().getZipPostalCode(), "")));
		hcell.setColspan(3);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Temporary Address ", headFont));
		hcell.setColspan(4);
		table.addCell(hcell);

		hcell = new PdfPCell(
				new Phrase("Hotel Name: " + Objects.toString(dto.getTemporaryAddress().getHotelName(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase(
				"Number and Street: " + Objects.toString(dto.getTemporaryAddress().getNumberAndStreet(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase(
				"Apartment Number: " + Objects.toString(dto.getTemporaryAddress().getApartmentNumber(), "")));
		hcell.setColspan(2);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase("Emergency Contact ", headFont));
		hcell.setColspan(4);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase(
				"Last (Family) Name: " + Objects.toString(dto.getEmergencyContact().getLastName(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(new Phrase(
				"First (Given) Name: " + Objects.toString(dto.getEmergencyContact().getFirstName(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(
				new Phrase("Address: " + Objects.toString(dto.getEmergencyContact().getAddress(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(
				new Phrase("Country: " + Objects.toString(dto.getEmergencyContact().getCountry(), "")));
		hcell.setColspan(1);
		table.addCell(hcell);

		hcell = new PdfPCell(
				new Phrase("Mobile Phone: " + Objects.toString(dto.getEmergencyContact().getMobilePhone(), "")));
		hcell.setColspan(4);
		table.addCell(hcell);

		if (dto.getFamilyTravelCompanions().length != 0) {
			hcell = new PdfPCell(new Phrase("Travel Companions Family ", headFont));
			hcell.setColspan(4);
			table.addCell(hcell);
		}

		for (Traveller companion : dto.getFamilyTravelCompanions()) {

			hcell = new PdfPCell(
					new Phrase("Last (Family) Name: " + Objects.toString(companion.getLastName(), "")));
			hcell.setColspan(1);
			table.addCell(hcell);

			hcell = new PdfPCell(
					new Phrase("First (Given) Name: " + Objects.toString(companion.getFirstName(), "")));
			hcell.setColspan(1);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Sex: " + Objects.toString(companion.getSex(), "")));
			hcell.setColspan(1);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Seat: " + Objects.toString(companion.getSeatNumber(), "")));
			hcell.setColspan(1);
			table.addCell(hcell);

			hcell = new PdfPCell(
					new Phrase("Date Of Birth: " + Objects.toString(companion.getDateOfBirth(), "")));
			hcell.setColspan(1);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Nationality: " + Objects.toString(companion.getNationality(), "")));
			hcell.setColspan(1);
			table.addCell(hcell);

			hcell = new PdfPCell(
					new Phrase("Passport Number: " + Objects.toString(companion.getPassportNumber(), "")));
			hcell.setColspan(2);
			table.addCell(hcell);
		}

		if (dto.getNonFamilyTravelCompanions().length != 0) {
			hcell = new PdfPCell(new Phrase("Travel Companions Non-Family ", headFont));
			hcell.setColspan(4);
			table.addCell(hcell);
		}

		for (Traveller companion : dto.getNonFamilyTravelCompanions()) {

			hcell = new PdfPCell(
					new Phrase("Last (Family) Name: " + Objects.toString(companion.getLastName(), "")));
			hcell.setColspan(1);
			table.addCell(hcell);

			hcell = new PdfPCell(
					new Phrase("First (Given) Name: " + Objects.toString(companion.getFirstName(), "")));
			hcell.setColspan(1);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Sex: " + Objects.toString(companion.getSex(), "")));
			hcell.setColspan(1);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Seat: " + Objects.toString(companion.getSeatNumber(), "")));
			hcell.setColspan(1);
			table.addCell(hcell);

			hcell = new PdfPCell(
					new Phrase("Date Of Birth: " + Objects.toString(companion.getDateOfBirth(), "")));
			hcell.setColspan(1);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Nationality: " + Objects.toString(companion.getNationality(), "")));
			hcell.setColspan(1);
			table.addCell(hcell);

			hcell = new PdfPCell(
					new Phrase("Passport Number: " + Objects.toString(companion.getPassportNumber(), "")));
			hcell.setColspan(2);
			table.addCell(hcell);
		}

		for (LabelContentPair pair : barcodeContentToLabel) {
			PdfPCell cell = new PdfPCell();
			cell.setColspan(4);
			Chunk chunk = new Chunk(pair.getLabel(), headFont);
			cell.addElement(chunk);
			cell.setBorder(Rectangle.NO_BORDER);
			table.addCell(cell);

			cell = new PdfPCell();
			cell.setColspan(4);
			Barcode128 code128 = new Barcode128();
			code128.setGenerateChecksum(true);
			code128.setCode(pair.getBarcodeContent());
			cell.addElement(code128.createImageWithBarcode(writer.getDirectContent(), null, null));
			cell.setBorder(Rectangle.NO_BORDER);
			table.addCell(cell);
		}
		document.add(table);
		document.close();
		writer.close();

		return stream;
	}

}
