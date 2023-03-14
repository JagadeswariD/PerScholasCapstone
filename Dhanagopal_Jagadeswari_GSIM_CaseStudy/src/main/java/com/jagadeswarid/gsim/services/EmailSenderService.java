package com.jagadeswarid.gsim.services;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailSenderService {

	 @Autowired
	    private JavaMailSender mailSender;
	 
	 @Value("${gsim.app.emailFrom}")
		private String fromEmail;

	    public void sendSimpleEmail(String toEmail,String subject,  String body, File imageFile )  throws MessagingException{
	      
	    	/*SimpleMailMessage message = new SimpleMailMessage();
	        message.setFrom("jagadeswaridhanagopal@gmail.com");
	        message.setTo(toEmail);
	        message.setText(body);
	        message.setSubject(subject);
	        mailSender.send(message);
	        System.out.println("Mail Send...");*/
	    	
	    	MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);
			
			helper.setSubject(subject);
			helper.setFrom(fromEmail);
			helper.setTo(toEmail);
			helper.setText(body, true);
			
			FileSystemResource resource = new FileSystemResource(imageFile);
			helper.addInline("image001", resource);

			mailSender.send(message);


	    }

}
