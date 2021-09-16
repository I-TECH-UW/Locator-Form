package org.itech.locator.form.webapp.api.dto;

import java.io.IOException;
import java.time.LocalDate;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.Data;

@Data
public class LocatorFormDTO extends Traveller {
	public enum Title {
		MR, MRS, MS, MISS, DR, OTHER;

		@Override
		@JsonValue
		public String toString() {
			return this.name().toLowerCase();
		}
	}

	public enum VisitPurpose {
		BUSINESS, PLEASURE, OTHER;

		@Override
		@JsonValue
		public String toString() {
			return this.name().toLowerCase();
		}
	}

	public enum TravellerType {
		RESIDENT, NONRESIDENT;

		@Override
		@JsonValue
		public String toString() {
			return this.name().toLowerCase();
		}
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

	@JsonSerialize(using = StringBooleanSerializer.class)
	private Boolean hadCovidBefore;
	@JsonSerialize(using = StringBooleanSerializer.class)
	private Boolean fever;
	@JsonSerialize(using = StringBooleanSerializer.class)
	private Boolean soreThroat;
	@JsonSerialize(using = StringBooleanSerializer.class)
	private Boolean jointPain;
	@JsonSerialize(using = StringBooleanSerializer.class)
	private Boolean cough;
	@JsonSerialize(using = StringBooleanSerializer.class)
	private Boolean breathingDifficulties;
	@JsonSerialize(using = StringBooleanSerializer.class)
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
	private String confirmEmail;

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
	@JsonSerialize(using = StringBooleanSerializer.class)
	private Boolean acceptedTerms;

	public static class StringBooleanSerializer extends JsonSerializer<Boolean> {

		@Override
		public void serialize(Boolean bool, JsonGenerator generator, SerializerProvider provider)
				throws IOException, JsonProcessingException {
			generator.writeString(bool == null ? "false" : bool.toString());
		}
	}

}
