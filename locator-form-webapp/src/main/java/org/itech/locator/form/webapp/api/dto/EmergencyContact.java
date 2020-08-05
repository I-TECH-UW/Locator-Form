package org.itech.locator.form.webapp.api.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class EmergencyContact {
	@NotBlank
	@Size(max = 50)
    private String lastName;
	@NotBlank
	@Size(max = 50)
    private String firstName;
	@NotBlank
	@Size(max = 50)
    private String city;
	@NotBlank
	@Size(max = 50)
    private String country;
	@NotBlank
	@Email
    private String email;
	@NotBlank
	@Size(max = 15)
    private String mobilePhone;
}
