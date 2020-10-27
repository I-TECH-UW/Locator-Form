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
		MR, MRS, MS, MISS, DR, OTHER
	}

	public enum VisitPurpose {
		BUSINESS, PLEASURE, OTHER
	}

	public enum TravellerType {
		RESIDENT, NONRESIDENT
	}

	@NotNull
	private TravellerType travellerType;

	@NotBlank
	@Size(max = 50)
    private String airlineName;
	@NotBlank
	@Size(max = 15)
    private String flightNumber;
	@NotNull
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate arrivalDate;

	@NotNull
	private Title title;

	private Integer lengthOfStay;

	@Size(max = 50)
	private String[] countriesVisited;
	@Size(max = 50)
    private String portOfEmbarkation;

	private Boolean fever;
	private Boolean soreThroat;
	private Boolean jointPain;
	private Boolean cough;
	private Boolean breathingDifficulties;
	private Boolean rash;

	@NotNull
	private VisitPurpose visitPurpose;
	@Size(max = 15)
	private String mobilePhone;
	@Size(max = 15)
	private String fixedPhone;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	@Size(max = 50)
	private String nationalID;

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
