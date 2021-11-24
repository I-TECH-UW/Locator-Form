package org.itech.locator.form.webapp.api.dto;

import org.itech.locator.form.webapp.validation.annotation.OneOf;

import lombok.Data;

@Data
public class HealthDeskDTO extends LocatorFormDTO {

	public String testKitId;

	@OneOf(resourcePath = "healthOffices.js")
	public String healthOffice;
}
