package org.itech.locator.form.webapp.api.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class Address {
	@NotBlank
	@Size(max = 50)
    private String numberAndStreet;
	@Size(max = 10)
    private String apartmentNumber;
	@NotBlank
	@Size(max = 50)
    private String city;
	@Size(max = 50)
    private String stateProvince;
	@NotBlank
	@Size(max = 50)
    private String country;
	@NotBlank
	@Size(max = 50)
    private String zipPostalCode;
}