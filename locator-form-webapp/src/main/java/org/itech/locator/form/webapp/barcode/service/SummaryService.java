package org.itech.locator.form.webapp.barcode.service;

import java.io.ByteArrayOutputStream;
import java.util.List;

import org.itech.locator.form.webapp.api.dto.LocatorFormDTO;
import org.itech.locator.form.webapp.barcode.LabelContentPair;

import com.itextpdf.text.DocumentException;

import net.sourceforge.barbecue.BarcodeException;
import net.sourceforge.barbecue.output.OutputException;

public interface SummaryService {

	ByteArrayOutputStream generateBarcodeFile(String barcodeLabel, String barcodeContent)
			throws OutputException, BarcodeException, DocumentException;

	ByteArrayOutputStream generateSummaryFile(List<LabelContentPair> barcodeContentToLabel,
			LocatorFormDTO locatorFormDto) throws OutputException, BarcodeException, DocumentException;

}
