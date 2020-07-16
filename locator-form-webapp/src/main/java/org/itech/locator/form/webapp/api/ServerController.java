package org.itech.locator.form.webapp.api;

import org.itech.locator.form.webapp.api.dto.FhirServerDTO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/locator-form")
public class ServerController {
    @PostMapping()
    public String submitForm(FhirServerDTO data) {
        System.out.println("Received: " + data.toString());
        return "return string";
    }
}
