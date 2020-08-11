package org.itech.locator.form.webapp.api.dto;

import java.time.LocalDate;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class LocatorFormDTO extends Traveller {

	public enum Title {
		MR, MRS, MISS, DR, OTHER
	}

	public enum VisitPurpose {
		BUSINESS, PLEASURE, OTHER
	}

	@NotBlank
	@Size(max = 50)
    private String airlineName;
	@NotBlank
	@Size(max = 15)
    private String flightNumber;
	@NotBlank
	@Size(max = 15)
    private String seatNumber;
	@NotNull
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate arrivalDate;

	@NotNull
	private Title title;

	@NotNull
	private Integer lengthOfStay;

	@Size(max = 50)
	private String[] countriesVisited;
	@NotBlank
	@Size(max = 50)
    private String portOfEmbarkation;

	@NotNull
	private Boolean fever;
	@NotNull
	private Boolean soreThroat;
	@NotNull
	private Boolean jointPain;
	@NotNull
	private Boolean cough;
	@NotNull
	private Boolean breathingDifficulties;
	@NotNull
	private Boolean rash;

	@NotNull
	private VisitPurpose visitPurpose;
	@NotBlank
	@Size(max = 15)
    private String mobilePhone;
	@NotBlank
	@Size(max = 15)
    private String businessPhone;

	@NotBlank
	@Size(max = 50)
	@Email
    private String email;
	@NotBlank
	@Size(max = 50)
    private String nationality;
	@NotBlank
	@Size(max = 20)
    private String passportNumber;

	@Valid
    private Address permanentAddress;
	@Valid
	private Address temporaryAddress;
	@Valid
    private EmergencyContact emergencyContact;

	@Valid
    private Traveller[] familyTravelCompanions;
	@Valid
	private Traveller[] nonFamilyTravelCompanions;

	@NotNull
	private Boolean acceptedTerms;

}
