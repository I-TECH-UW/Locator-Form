package org.itech.soap.infohighway.config;

import org.itech.soap.infohighway.client.InfoHighwayClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.ws.transport.WebServiceMessageSender;
import org.springframework.ws.transport.http.ClientHttpRequestMessageSender;

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
	public WebServiceMessageSender messageSender() {
		SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
		if (configProperties.getReadTimeout() > 0) {
			requestFactory.setReadTimeout(configProperties.getReadTimeout());
		}
		if (configProperties.getConnectionTimeout() > 0) {
			requestFactory.setConnectTimeout(configProperties.getConnectionTimeout());
		}
		return new ClientHttpRequestMessageSender(requestFactory);
	}

}
