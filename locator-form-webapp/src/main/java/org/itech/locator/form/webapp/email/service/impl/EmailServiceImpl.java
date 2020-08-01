package org.itech.locator.form.webapp.email.service.impl;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.util.Map;
import java.util.Map.Entry;

import javax.activation.DataSource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.mail.util.ByteArrayDataSource;

import org.itech.locator.form.webapp.email.service.EmailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

	@Value("${org.itech.locator.form.email.from:noreply@itech.org}")
	private String from;

	private JavaMailSender javaMailSender;

	public EmailServiceImpl(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}

	@Override
	public void sendSimpleMessage(String to, String subject, String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(from);
		message.setTo(to);
		message.setSubject(subject);
		message.setText(text);
		javaMailSender.send(message);
	}

	@Override
	public void sendMessageWithAttachment(String to, String subject, String text, String attachmentFileName,
			String pathToAttachment) throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setFrom(from);
		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(text);
		FileSystemResource file = new FileSystemResource(new File(pathToAttachment));
		helper.addAttachment(attachmentFileName, file);
		javaMailSender.send(message);
	}

	@Override
	public void sendMessageWithAttachment(String to, String subject, String text, File attachment)
			throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setFrom(from);
		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(text);
		helper.addAttachment(attachment.getName(), attachment);
		javaMailSender.send(message);
	}

	@Override
	public void sendMessageWithAttachment(String to, String subject, String text, Iterable<File> attachments)
			throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setFrom(from);
		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(text);
		for (File attachment : attachments) {
			helper.addAttachment(attachment.getName(), attachment);
		}
		javaMailSender.send(message);
	}

	@Override
	public void sendMessageWithAttachment(String to, String subject, String text,
			Map<String, ByteArrayOutputStream> pdfsByName) throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setFrom(from);
		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(text);
		for (Entry<String, ByteArrayOutputStream> pdfByName : pdfsByName.entrySet()) {
			DataSource dataSource = new ByteArrayDataSource(pdfByName.getValue().toByteArray(), "application/pdf");
			helper.addAttachment(pdfByName.getKey(), dataSource);
		}
		javaMailSender.send(message);
	}

}
