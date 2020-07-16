package org.itech.locator.form.webapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@ComponentScan("org.itech")
@PropertySource(value = { "classpath:application.properties" })
public class FhirServerManagementWebApp {

	public static void main(String[] args) {
		SpringApplication.run(FhirServerManagementWebApp.class, args);
	}

}
