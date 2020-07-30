package org.itech.locator.form.webapp.barcode.service.impl;

import java.io.ByteArrayOutputStream;
import java.util.List;

import org.itech.locator.form.webapp.barcode.LabelContentPair;
import org.itech.locator.form.webapp.barcode.service.BarcodeService;
import org.springframework.stereotype.Service;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.Barcode128;
import com.itextpdf.text.pdf.PdfWriter;

import net.sourceforge.barbecue.BarcodeException;
import net.sourceforge.barbecue.output.OutputException;

@Service
public class BarcodeServiceImpl implements BarcodeService {

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
	public ByteArrayOutputStream generateBarcodeFile(List<LabelContentPair> barcodeContentToLabel)
			throws OutputException, BarcodeException, DocumentException {
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		Document document = new Document(new Rectangle(PageSize.LETTER));
		PdfWriter writer = PdfWriter.getInstance(document, stream);
		document.open();
		for (LabelContentPair pair : barcodeContentToLabel) {
			Font font = FontFactory.getFont(FontFactory.COURIER, 16, BaseColor.BLACK);
			Chunk chunk = new Chunk(pair.getLabel(), font);
			document.add(chunk);
			Barcode128 code128 = new Barcode128();
			code128.setGenerateChecksum(true);
			code128.setCode(pair.getBarcodeContent());
			document.add(code128.createImageWithBarcode(writer.getDirectContent(), null, null));
		}
		document.close();
		writer.close();

		return stream;
	}

}
