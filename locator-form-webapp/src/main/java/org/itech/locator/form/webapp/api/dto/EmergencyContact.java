package org.itech.locator.form.webapp.api.dto;

import lombok.Data;

@Data
public class EmergencyContact {
    private String lastName;
    private String firstName;
    private String city;
    private String country;
    private String email;
    private String mobilePhone;
};
