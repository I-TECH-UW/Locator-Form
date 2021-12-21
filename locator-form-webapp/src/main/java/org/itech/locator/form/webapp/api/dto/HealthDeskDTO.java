package org.itech.locator.form.webapp.api.dto;

import org.itech.locator.form.webapp.validation.annotation.OneOf;
import org.itech.locator.form.webapp.validation.annotation.TestKitId;

import lombok.Data;

@Data
public class HealthDeskDTO extends LocatorFormDTO {

	@TestKitId
	public String testKitId;

	@OneOf(resourcePath = "healthOffices.js")
	public String healthOffice;
}
