package org.itech.locator.form.webapp.api.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class LocatorFormDTO {

    private UUID id;
    
    private String airlineName; 
    private String flightNumber; 
    private String seatNumber; 
    private String arrivalDate; 
    
    private String title; 
    private String firstName;
    private String lastName; 
    private String middleInitial; 
    private String gender; 
    
    private String lengthOfStay; 
    private String countriesVisited; 
    private String portOfEmbarkation; 
    
    private String fever; 
    private String soreThroat; 
    private String jointPain; 
    private String cough; 
    private String breathingDifficulties; 
    private String rash; 
    
    private String visitPurpose; 
    private String mobilePhone; 
    private String businessPhone; 
    
    private String email; 
    private String nationality; 
    private String passportNumber; 
   
    private PermanentAddress permanentAddress;
    private TemporaryAddress temporaryAddress;
    private EmergencyContact emergencyContact;
    
    private FamilyTravelCompanion[] familyTravelCompanions;
    private NonFamilyTravelCompanion[] nonFamilyTravelCompanions;
    
    private String acceptedTerms; 
   
}
