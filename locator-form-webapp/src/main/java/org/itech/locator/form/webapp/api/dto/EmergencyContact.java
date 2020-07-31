package org.itech.locator.form.webapp.api.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class EmergencyContact {
	@NotBlank
    private String lastName;
	@NotBlank
    private String firstName;
	@NotBlank
    private String city;
	@NotBlank
    private String country;
	@NotBlank
	@Email
    private String email;
	@NotBlank
    private String mobilePhone;
}
