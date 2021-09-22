package org.itech.locator.form.webapp.api.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class HealthDeskDTO extends LocatorFormDTO {

	@NotBlank
	public String testKitId;
}
