package org.itech.soap.infohighway.config;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.HttpClient;
import org.itech.soap.infohighway.client.InfoHighwayClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.ws.transport.WebServiceMessageSender;
import org.springframework.ws.transport.http.HttpComponentsMessageSender;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class InfoHighwayClientConfig {

	@Value("${org.openhim.basicauth.username:}")
	private String openHimUsername;

	@Value("${org.openhim.basicauth.password:}")
	private String openHimPassword;

	private InfoHighwayConfigProperties configProperties;
	private HttpClient httpClient;

	public InfoHighwayClientConfig(InfoHighwayConfigProperties configProperties,
			@Qualifier("soapHttpClient") HttpClient httpClient) {
		this.configProperties = configProperties;
		this.httpClient = httpClient;
	}

	@Bean
	public Jaxb2Marshaller marshaller() {
		Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
		marshaller.setContextPath("org.itech.soap.infohighway");
		return marshaller;
	}

	@Bean
	public InfoHighwayClient infoHighwayClient(Jaxb2Marshaller marshaller, WebServiceMessageSender messageSender) {
		InfoHighwayClient client = new InfoHighwayClient(configProperties.getUsername(),
				configProperties.getPassword());
		client.setDefaultUri(configProperties.getUri().toString());
		client.setMarshaller(marshaller);
		client.setUnmarshaller(marshaller);
		client.setMessageSender(messageSender);
		return client;
	}

	@Bean
	public WebServiceMessageSender httpComponentsMessageSender() throws Exception {
		HttpComponentsMessageSender httpComponentsMessageSender = new HttpComponentsMessageSender();
		httpComponentsMessageSender.setHttpClient(httpClient);
		if (!StringUtils.isEmpty(openHimUsername) || !StringUtils.isEmpty(openHimPassword)) {
			log.debug("OpenHIM username and password supplied, loading into WebServiceMessageSender");
			httpComponentsMessageSender.setCredentials(new UsernamePasswordCredentials(openHimUsername, openHimPassword));
		} else {
			log.debug("No OpenHIM authentication supplied, WebServiceMessageSender will have no authentication");
		}
		return httpComponentsMessageSender;
	}

}
