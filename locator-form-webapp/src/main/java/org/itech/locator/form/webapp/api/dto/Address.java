package org.itech.locator.form.webapp.api.dto;

import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class Address {
	@Size(max = 50)
	private String hotelName;
	@Size(max = 50)
    private String numberAndStreet;
	@Size(max = 20)
    private String apartmentNumber;
	@Size(max = 50)
    private String city;
	@Size(max = 50)
    private String stateProvince;
	@Size(max = 50)
    private String country;
	@Size(max = 20)
    private String zipPostalCode;
}
