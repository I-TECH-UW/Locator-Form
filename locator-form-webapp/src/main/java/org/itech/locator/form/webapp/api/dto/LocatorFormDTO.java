package org.itech.locator.form.webapp.api.dto;

import java.io.IOException;
import java.time.LocalDate;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
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

	public enum Vaccine {
	    NONE, NA, PFIZERBIONTECH, MODERNA, OXFORDASTRAZENECA, SPUTNIKVGAMALEYARESEARCHINSTITUTE, NOVAVAX, SINOPHARM, SINOVAC, JANSSENJOHNSONJOHNSON;

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
	public String taskId;

	@JsonSerialize(using = StringBooleanSerializer.class)
    private Boolean vaccinated;
	@JsonDeserialize(using = VaccineDeserializer.class)
	private Vaccine firstVaccineName;
	@JsonDeserialize(using = VaccineDeserializer.class)
	private Vaccine secondVaccineName;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dateOfFirstDose;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dateOfSecondDose;

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
	@Size(max = 50)
    private String profession;

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

	@JsonSerialize(using = StringBooleanSerializer.class)
	private Boolean smellOrTaste;
	@JsonSerialize(using = StringBooleanSerializer.class)
	private Boolean contact;

	@NotNull
	private VisitPurpose visitPurpose;
	@Size(max = 15)
	private String mobilePhone;
	@Size(max = 15)
	private String fixedPhone;
	@Size(max = 15)
    private String businessPhone;

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

	@Size(max = 50)
    private String countryOfBirth;
	@Size(max = 50)
    private String countryOfPassportIssue;
	@Size(max = 50)
    private String passportNumber;
	@JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate passportExpiryDate;

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

	public static class VaccineDeserializer extends JsonDeserializer<Vaccine> {

		@Override
		public Vaccine deserialize(JsonParser p, DeserializationContext ctxt)
				throws IOException, JsonProcessingException {
			String value = p.getText();
			for (final Vaccine vaccine : Vaccine.values()) {
				if (vaccine.name().equalsIgnoreCase(value)) {
					return vaccine;
				}
			}
			return null;
		}
	}

}
