package org.itech.soap.infohighway.config;

import org.itech.soap.infohighway.client.InfoHighwayClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;

@Configuration
public class InfoHighwayClientConfig {

	private InfoHighwayConfigProperties configProperties;

	public InfoHighwayClientConfig(InfoHighwayConfigProperties configProperties) {
		this.configProperties = configProperties;
	}

	@Bean
	public Jaxb2Marshaller marshaller() {
		Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
		marshaller.setContextPath("org.itech.soap.infohighway");
		return marshaller;
	}

	@Bean
	public InfoHighwayClient infoHighwayClient(Jaxb2Marshaller marshaller) {
		InfoHighwayClient client = new InfoHighwayClient(configProperties.getUsername(),
				configProperties.getPassword());
		client.setDefaultUri(configProperties.getUri().toString());
		client.setMarshaller(marshaller);
		client.setUnmarshaller(marshaller);
		return client;
	}

}
