package org.itech.locator.form.webapp.api.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.itech.locator.form.webapp.api.dto.LocatorFormDTO.Sex;

import lombok.Data;

@Data
public class TravelCompanion {
	@NotBlank
	@Size(max = 50)
    private String lastName;
	@NotBlank
	@Size(max = 50)
    private String firstName;
	@NotBlank
	@Size(max = 3)
    private String middleInitial;
	@NotBlank
	@Size(max = 50)
    private String seatNumber;
	@NotNull
	private LocalDate dateOfBirth;
	@NotNull
	private Sex sex;
	@NotBlank
	@Size(max = 50)
    private String nationality;
	@NotBlank
	@Size(max = 50)
    private String passportNumber;
}
