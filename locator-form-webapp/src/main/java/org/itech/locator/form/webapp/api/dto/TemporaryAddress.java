package org.itech.locator.form.webapp.api.dto;

import lombok.Data;

@Data
public class TemporaryAddress {
    private String numberAndStreet;
    private String apartmentNumber;
    private String city;
    private String stateProvince;
    private String country;
    private String zipPostalCode;
};
