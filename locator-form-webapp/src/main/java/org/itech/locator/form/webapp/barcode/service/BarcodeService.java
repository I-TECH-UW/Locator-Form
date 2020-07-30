package org.itech.locator.form.webapp.barcode.service;

import java.io.ByteArrayOutputStream;
import java.util.List;

import org.itech.locator.form.webapp.barcode.LabelContentPair;

import com.itextpdf.text.DocumentException;

import net.sourceforge.barbecue.BarcodeException;
import net.sourceforge.barbecue.output.OutputException;

public interface BarcodeService {

	ByteArrayOutputStream generateBarcodeFile(String barcodeLabel, String barcodeContent)
			throws OutputException, BarcodeException, DocumentException;

	ByteArrayOutputStream generateBarcodeFile(List<LabelContentPair> barcodeContentToLabel)
			throws OutputException, BarcodeException, DocumentException;

}
