package org.itech.locator.form.webapp.summary.service.impl;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.apache.commons.lang3.StringUtils;
import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.api.dto.Traveller;
import org.itech.locator.form.webapp.country.Country;
import org.itech.locator.form.webapp.summary.LabelContentPair;
import org.itech.locator.form.webapp.summary.config.SummaryConfig;
import org.itech.locator.form.webapp.summary.service.SummaryService;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.text.BadElementException;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.Barcode128;
import com.itextpdf.text.pdf.BarcodeQRCode;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import lombok.extern.slf4j.Slf4j;
import net.sourceforge.barbecue.BarcodeException;
import net.sourceforge.barbecue.output.OutputException;

@Service
@Slf4j
public class SummaryServiceImpl implements SummaryService {

	private SummaryConfig summaryConfig;

	public SummaryServiceImpl(SummaryConfig summaryConfig) {
		this.summaryConfig = summaryConfig;
	}

	private Country[] countries;
	Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
	Font font = FontFactory.getFont(FontFactory.HELVETICA, 11.5f, BaseColor.BLACK);

	@Override
	public ByteArrayOutputStream generateBarcodeFile(String barcodeLabel, String barcodeContent)
			throws OutputException, BarcodeException, DocumentException {
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		Document document = new Document(new Rectangle(PageSize.LETTER));
		PdfWriter writer = PdfWriter.getInstance(document, stream);
		document.open();
		Chunk chunk = new Chunk(barcodeLabel, font);
		document.add(chunk);
		switch (summaryConfig.getBarcodeType()) {
		case QR:
			BarcodeQRCode barcodeQRCode = new BarcodeQRCode(barcodeContent, 1000, 1000, null);
			Image codeQrImage = barcodeQRCode.getImage();
			codeQrImage.scaleAbsolute(100, 100);
			document.add(codeQrImage);
			break;
		case BAR_128:
			Barcode128 code128 = new Barcode128();
			code128.setGenerateChecksum(true);
			code128.setCode(barcodeContent);
			document.add(code128.createImageWithBarcode(writer.getDirectContent(), null, null));
			break;
		default:
		}
		document.close();
		writer.close();

		return stream;
	}

	@Override
	public ByteArrayOutputStream generateSummaryFile(Map<String, LabelContentPair> idAndLabels, LocatorFormDTO dto)
			throws OutputException, BarcodeException, DocumentException {
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		Document document = new Document(new Rectangle(PageSize.LETTER));
		document.addTitle("Locator-Form Barcodes");
		PdfWriter writer = PdfWriter.getInstance(document, stream);
		document.open();
		PdfPTable table = new PdfPTable(4);
		table.setWidthPercentage(100);

		addHeaderCellToTable("Traveller ", 4, table);
		addCellToTable("Passenger Type: " + Objects.toString(dto.getTravellerType(), ""), 4, table);
		addPersonalInformationToTable(dto, table);
		addHealthInformationToTable(dto, table);
		addCommonInformationToTable(dto, dto, table);
		addBarcodeLabelToTable(idAndLabels.get(dto.getServiceRequestId()), 4, table, writer);
		document.add(table);
		document.newPage();

		for (Traveller companion : dto.getFamilyTravelCompanions()) {
			table = new PdfPTable(4);
			table.setWidthPercentage(100);

			addPersonalInformationToTable(companion, table);
			addCommonInformationToTable(dto, companion, table);
			addBarcodeLabelToTable(idAndLabels.get(companion.getServiceRequestId()), 4, table, writer);
			document.add(table);
			document.newPage();
		}

		for (Traveller companion : dto.getNonFamilyTravelCompanions()) {
			table = new PdfPTable(4);
			table.setWidthPercentage(100);

			addPersonalInformationToTable(companion, table);
			addCommonInformationToTable(dto, companion, table);
			addBarcodeLabelToTable(idAndLabels.get(companion.getServiceRequestId()), 4, table, writer);
			document.add(table);
			document.newPage();
		}

//		table = new PdfPTable(4);
//		table.setWidthPercentage(100);

		document.close();
		writer.close();

		return stream;
	}

	private void addHeaderCellToTable(String label, int columns, PdfPTable table) {
		PdfPCell hcell = new PdfPCell(new Phrase(label, headFont));
		hcell.setColspan(columns);
		table.addCell(hcell);
	}

	private void addCellToTable(String label, int columns, PdfPTable table) {
		PdfPCell hcell = new PdfPCell(new Phrase(label, font));
		hcell.setColspan(columns);
		table.addCell(hcell);
	}

	private void addBarcodeLabelToTable(LabelContentPair pair, int columns, PdfPTable table, PdfWriter writer)
			throws BadElementException {
		PdfPCell cell = new PdfPCell();
		cell.setColspan(4);
		Chunk chunk = new Chunk(pair.getLabel() + ": " + pair.getBarcodeContent(), headFont);
		cell.addElement(chunk);
		cell.setBorder(Rectangle.NO_BORDER);
		table.addCell(cell);

		cell = new PdfPCell();
		cell.setColspan(4);

		switch (summaryConfig.getBarcodeType()) {
		case QR:
			BarcodeQRCode barcodeQRCode = new BarcodeQRCode(pair.getBarcodeContent(), 1000, 1000, null);
			Image codeQrImage = barcodeQRCode.getImage();
			codeQrImage.scaleAbsolute(100, 100);
			cell.addElement(codeQrImage);
			break;
		case BAR_128:
			Barcode128 code128 = new Barcode128();
			code128.setGenerateChecksum(true);
			code128.setCode(pair.getBarcodeContent());
			cell.addElement(code128.createImageWithBarcode(writer.getDirectContent(), null, null));
			break;
		default:
		}

		cell.setBorder(Rectangle.NO_BORDER);
		table.addCell(cell);
	}

	private void addPersonalInformationToTable(Traveller traveller, PdfPTable table) {
		addHeaderCellToTable("Personal Information ", 4, table);
		if (traveller instanceof LocatorFormDTO) {
			addCellToTable("Title: " + Objects.toString(((LocatorFormDTO) traveller).getTitle(), ""), 1, table);
		} else {
			addCellToTable("", 1, table);
		}
		addCellToTable("Last (Family) Name: " + Objects.toString(traveller.getLastName(), ""), 1, table);
		addCellToTable("First (Given) Name: " + Objects.toString(traveller.getFirstName(), ""), 1, table);
		addCellToTable("Middle Initial: " + Objects.toString(traveller.getMiddleInitial(), ""), 1, table);
		addCellToTable("Sex: " + Objects.toString(traveller.getSex(), ""), 1, table);
		addCellToTable("Date Of Birth: " + Objects.toString(traveller.getDateOfBirth(), ""), 1, table);
		
		addCellToTable("Country Of Birth: " + Objects.toString(getCountryLabelForValue(traveller.getCountryOfBirth()), ""), 1, table);
		addCellToTable("Passport Issue Country: " + Objects.toString(getCountryLabelForValue(traveller.getCountryOfPassportIssue()), ""), 1, table);
		addCellToTable("Passport Expiry Date: " + Objects.toString(traveller.getPassportExpiryDate(), ""), 1, table);
		addCellToTable("Passport Number: " + Objects.toString(traveller.getPassportNumber(), ""), 1, table);
	}

	private void addHealthInformationToTable(LocatorFormDTO dto, PdfPTable table) {
		addHeaderCellToTable("Health Information ", 4, table);
		addCellToTable("Proposed Length of Stay in Mauritius (days): " + Objects.toString(dto.getLengthOfStay(), ""), 1,
				table);
		addCellToTable("Countries visited during last 6 months: "
				+ StringUtils.join(getCountriesVisitedByName(dto.getCountriesVisited()), ", "), 2,
				table);
		addCellToTable("Port Of Embarkation: " + Objects.toString(dto.getPortOfEmbarkation(), ""), 1, table);

		addHeaderCellToTable("Have you experienced any of the following within the past 14 days? ", 4, table);
		addCellToTable("Fever: " + Objects.toString(dto.getFever(), ""), 1, table);
		addCellToTable("Sore Throat: " + Objects.toString(dto.getSoreThroat(), ""), 1, table);
		addCellToTable("Joint Pain: " + Objects.toString(dto.getJointPain(), ""), 1, table);
		addCellToTable("Cough: " + Objects.toString(dto.getCough(), ""), 1, table);
		addCellToTable("Breathing Difficulties: " + Objects.toString(dto.getBreathingDifficulties(), ""), 1, table);
		addCellToTable("Rash: " + Objects.toString(dto.getRash(), ""), 1, table);
		addCellToTable("Loss of Sense of Smell or Taste: " + Objects.toString(dto.getSmellOrTaste(), ""), 2, table);
		
//		addHeaderCellToTable("Other Health Questions:  ", 4, table);
		addCellToTable("Possible contact with COVID 19: " + Objects.toString(dto.getContact(), ""), 4, table);
		addCellToTable("Have you tested positive for Covid-19 in the past 7 days? " + Objects.toString(dto.getHadCovidBefore(), ""),
				4, table);
		
		addHeaderCellToTable("Vaccine ", 4, table);
        addCellToTable("Vaccinated: " + Objects.toString(dto.getVaccinated(), ""), 4, table);
        addCellToTable("First Vaccine: " + Objects.toString(dto.getFirstVaccineName(), ""), 1, table);
        addCellToTable("First Vaccine Date: " + Objects.toString(dto.getDateOfFirstDose(), ""), 1, table);
        addCellToTable("Second Vaccine: " + Objects.toString(dto.getSecondVaccineName(), ""), 1, table);
        addCellToTable("Second Vaccine Date: " + Objects.toString(dto.getDateOfSecondDose(), ""), 1, table);
	}

	private void addCommonInformationToTable(LocatorFormDTO dto, Traveller traveller, PdfPTable table) {
		addHeaderCellToTable("Flight Information ", 4, table);
		addCellToTable("Airline: " + Objects.toString(dto.getAirlineName(), ""), 1, table);
		addCellToTable("Flight: " + Objects.toString(dto.getFlightNumber(), ""), 1, table);
		addCellToTable("Seat: " + Objects.toString(traveller.getSeatNumber(), ""), 1, table);
		addCellToTable("Date Of Arrival: " + Objects.toString(dto.getArrivalDate(), ""), 1, table);
		
		addHeaderCellToTable("Contact Info ", 4, table);
		addCellToTable("Purpose of Visit: " + Objects.toString(dto.getVisitPurpose(), ""), 2, table);
		addCellToTable("Email Address: " + Objects.toString(dto.getEmail(), ""), 2, table);
		addCellToTable("Mobile Phone: " + Objects.toString(dto.getMobilePhone(), ""), 2, table);
		addCellToTable("Fixed Phone:" + Objects.toString(dto.getFixedPhone(), ""), 1, table);
		addCellToTable("Business Phone:" + Objects.toString(dto.getBusinessPhone(), ""), 1, table);
		

		addHeaderCellToTable("Permanent Address ", 4, table);
		addCellToTable("Number and Street: " + Objects.toString(dto.getPermanentAddress().getNumberAndStreet(), ""), 1,
				table);
		addCellToTable("Apartment Number: " + Objects.toString(dto.getPermanentAddress().getApartmentNumber(), ""), 1,
				table);
		addCellToTable("City: " + Objects.toString(dto.getPermanentAddress().getCity(), ""), 1, table);
		addCellToTable("State/Province: " + Objects.toString(dto.getPermanentAddress().getStateProvince(), ""), 1,
				table);
		addCellToTable(
				"Country: " + Objects.toString(getCountryLabelForValue(dto.getPermanentAddress().getCountry()), ""), 1,
				table);
		addCellToTable("Zip/Postal Code: " + Objects.toString(dto.getPermanentAddress().getZipPostalCode(), ""), 3,
				table);

		addHeaderCellToTable("Temporary Address ", 4, table);
		addCellToTable("Hotel Name: " + Objects.toString(dto.getTemporaryAddress().getHotelName(), ""), 1, table);
		addCellToTable("Number and Street: " + Objects.toString(dto.getTemporaryAddress().getNumberAndStreet(), ""), 1,
				table);
		addCellToTable("Apartment Number: " + Objects.toString(dto.getTemporaryAddress().getApartmentNumber(), ""), 2,
				table);

		addHeaderCellToTable("Emergency Contact ", 4, table);
		addCellToTable("Last (Family) Name: " + Objects.toString(dto.getEmergencyContact().getLastName(), ""), 1,
				table);
		addCellToTable("First (Given) Name: " + Objects.toString(dto.getEmergencyContact().getFirstName(), ""), 1,
				table);
		addCellToTable("Address: " + Objects.toString(dto.getEmergencyContact().getAddress(), ""), 1, table);
		addCellToTable(
				"Country: " + Objects.toString(getCountryLabelForValue(dto.getEmergencyContact().getCountry()), ""), 1,
				table);
		addCellToTable("Mobile Phone: " + Objects.toString(dto.getEmergencyContact().getMobilePhone(), ""), 4, table);

		if (dto != traveller) {
			addHeaderCellToTable("Primary Travel Companion ", 4, table);
			addCellToTable("Last (Family) Name: " + Objects.toString(dto.getLastName(), ""), 1, table);
			addCellToTable("First (Given) Name: " + Objects.toString(dto.getFirstName(), ""), 1, table);
			addCellToTable("Sex: " + Objects.toString(dto.getSex(), ""), 1, table);
			addCellToTable("Seat: " + Objects.toString(dto.getSeatNumber(), ""), 1, table);
			addCellToTable("Date Of Birth: " + Objects.toString(dto.getDateOfBirth(), ""), 1, table);
			addCellToTable("Profession: " + Objects.toString(dto.getProfession(), ""), 1, table);
			addCellToTable("Country Of Birth: " + Objects.toString(getCountryLabelForValue(dto.getCountryOfBirth()), ""),1, table);
			addCellToTable("Passport Number: " + Objects.toString(dto.getPassportNumber(), ""), 2, table);
		}

		if (dto.getFamilyTravelCompanions().length != 0) {
			addHeaderCellToTable("Travel Companions Family ", 4, table);
		}
		for (Traveller companion : dto.getFamilyTravelCompanions()) {
			if (companion != traveller) {
				addCellToTable("Last (Family) Name: " + Objects.toString(companion.getLastName(), ""), 1, table);
				addCellToTable("First (Given) Name: " + Objects.toString(companion.getFirstName(), ""), 1, table);
				addCellToTable("Sex: " + Objects.toString(companion.getSex(), ""), 1, table);
				addCellToTable("Seat: " + Objects.toString(companion.getSeatNumber(), ""), 1, table);
				addCellToTable("Date Of Birth: " + Objects.toString(companion.getDateOfBirth(), ""), 1, table);
				addCellToTable(
						"Nationality: " + Objects.toString(getCountryLabelForValue(companion.getNationality()), ""), 1,
						table);
				addCellToTable("Passport Number: " + Objects.toString(companion.getPassportNumber(), ""), 2, table);
			}
		}

		if (dto.getNonFamilyTravelCompanions().length != 0) {
			addHeaderCellToTable("Travel Companions Non-Family ", 4, table);
		}
		for (Traveller companion : dto.getNonFamilyTravelCompanions()) {
			if (companion != traveller) {
				addCellToTable("Last (Family) Name: " + Objects.toString(companion.getLastName(), ""), 1, table);
				addCellToTable("First (Given) Name: " + Objects.toString(companion.getFirstName(), ""), 1, table);
				addCellToTable("Sex: " + Objects.toString(companion.getSex(), ""), 1, table);
				addCellToTable("Seat: " + Objects.toString(companion.getSeatNumber(), ""), 1, table);
				addCellToTable("Date Of Birth: " + Objects.toString(companion.getDateOfBirth(), ""), 1, table);
				addCellToTable(
						"Nationality: " + Objects.toString(getCountryLabelForValue(companion.getNationality()), ""), 1,
						table);
				addCellToTable("Passport Number: " + Objects.toString(companion.getPassportNumber(), ""), 2, table);
			}
		}

	}

	private List<String> getCountriesVisitedByName(Collection<String> countriesVisited) {
		List<String> countriesVisitedByName = new ArrayList<>();
		for (String countryVisited : countriesVisited) {
			countriesVisitedByName.add(getCountryLabelForValue(countryVisited));
		}
		return countriesVisitedByName;
	}

	private List<String> getCountriesVisitedByName(String[] countriesVisited) {
		List<String> countriesVisitedByName = new ArrayList<>();
		for (String countryVisited : countriesVisited) {
			countriesVisitedByName.add(getCountryLabelForValue(countryVisited));
		}
		return countriesVisitedByName;
	}

	private Country[] getCountries() {
		if (countries == null) {
			ObjectMapper mapper = new ObjectMapper();
			ClassLoader cLoader = this.getClass().getClassLoader();
			try {
				countries = mapper.readValue(cLoader.getResourceAsStream("countries.js"), Country[].class);
			} catch (IOException e) {
				log.error("could not parse countries file, using values instead of label");
				countries = new Country[0];
			}
		}
		return countries;
	}

	private String getCountryLabelForValue(String value) {
		if (value == null) {
			return null;
		}
		for (Country country : getCountries()) {
			if (country.getValue().equals(value)) {
				return country.getLabel();
			}
		}
		return value;
	}

}
