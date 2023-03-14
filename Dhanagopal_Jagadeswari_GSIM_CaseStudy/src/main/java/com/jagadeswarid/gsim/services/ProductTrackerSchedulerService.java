package com.jagadeswarid.gsim.services;

import java.io.File;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.jagadeswarid.gsim.dto.ProductTrackerDTO;
import com.jagadeswarid.gsim.mapper.ProductTrackerMapper;
import com.jagadeswarid.gsim.model.EAlert;
import com.jagadeswarid.gsim.model.ProductDetail;
import com.jagadeswarid.gsim.model.ProductTracker;
import com.jagadeswarid.gsim.repository.ProductDetailRepository;
import com.jagadeswarid.gsim.repository.ProductTrackerRepository;

import jakarta.mail.MessagingException;

@Service
public class ProductTrackerSchedulerService {
	
		@Value("${gsim.app.alertLevel}")
		private String alertLevel;
		
		@Value("${gsim.app.alertStatus}")
		private String alertStatus;
		
		@Value("${gsim.app.emailTo}")
		private String toEmail;
		
		@Autowired
		private ProductTrackerMapper mapper;
		@Autowired
		private ProductTrackerRepository repository;
		
		@Autowired
		ProductDetailRepository pdRepository;
		
		@Autowired
		ProductTrackerRepository pdtRepository;
		
		@Autowired
		private EmailSenderService senderService;
		
		Logger log = LoggerFactory.getLogger(ProductTrackerSchedulerService.class);
		
		
		//Method to call Tracker Scheduler
		@Scheduled(cron = "${gsim.app.cronExpression}")
		public void evaluate() {
			System.out.println(alertLevel);
			if(alertStatus.equals("ENABLE"))
			{
				List<ProductDetail> pdList = pdRepository.findAll();
				pdList.forEach((p)->{
					switch(alertLevel) {
					
					//stock count less than limit+50% of limit
					case "MODERATE": {
						
						if((p.getProductStockCount()<(p.getProductThresholdValue()+(p.getProductThresholdValue()/2) ))) 
						{
					
							ProductTracker productTracker = new ProductTracker(p.getId(),p.getProduct(),
									p.getCategory(),p.getVendor(),EAlert.MODERATE,p.getProductStockCount(),p.getProductThresholdValue());
							pdtRepository.save(productTracker);
							
							String subject="Attention: MODERATE ALERT!";
							
							String content = emailContent(p);
							
							File bannerImg = new File("C:/Users/djesw/Desktop/img/moderate_alert.png");
							
							try {
								
								senderService.sendSimpleEmail(toEmail, subject, content, bannerImg);
								
							} catch (MessagingException e) {
								log.error(e.getMessage());
							}
						}
					}
					//Irrespective stock count vs limit value
					case "NORMAL":{
						
							ProductTracker productTracker = new ProductTracker(p.getId(),p.getProduct(),
									p.getCategory(),p.getVendor(),EAlert.NORMAL,p.getProductStockCount(),p.getProductThresholdValue());
							pdtRepository.save(productTracker);
							
							String subject="Attention: NORMAL ALERT!";
							
							String content = emailContent(p);
							
							File bannerImg = new File("C:/Users/djesw/Desktop/img/normal_alert.png");
							
							try {
								
								senderService.sendSimpleEmail(toEmail, subject, content, bannerImg);
								
							} catch (MessagingException e) {
								// TODO Auto-generated catch block
								log.error(e.getMessage());
							}
						
					}//HIGH priority when stock count is equal or less than limit
					default:
					{
						if(p.getProductStockCount()<=p.getProductThresholdValue()) 
						{
						ProductTracker productTracker = new ProductTracker(p.getId(),p.getProduct(),
								p.getCategory(),p.getVendor(),EAlert.HIGH,p.getProductStockCount(),p.getProductThresholdValue());
						pdtRepository.save(productTracker);
						
						String subject="Attention: HIGH ALERT!";
						
						String content = emailContent(p);
						
						File bannerImg = new File("C:/Users/djesw/Desktop/img/high_alert.png");
						
						try {
							
							senderService.sendSimpleEmail(toEmail, subject, content, bannerImg);
							
						} catch (MessagingException e) {
							// TODO Auto-generated catch block
							log.error(e.getMessage());
						}
						}
					}
					}
				});
				
			}
			log.info("Evaluate method called from Scheduler");
		}
		//Email Formating Method
		String emailContent(ProductDetail productDetail) {
			
			String content = "<Center> <h1>Alert Level: "+alertLevel+"</h1> <br/><img src='cid:image001'/>"
					+ "</Center><br><br><h3>Need your attention for the below Product: </h3> <br/><br/>"
					+ "<table><tr><th>Product Detail ID: </th><th>"+productDetail.getId()+"</th></tr><tr><th>Product Name: </th><th>"+productDetail.getProduct().getProductName()+"</th></tr>"
					+ "<tr><th>Vendor Contact: </th><th>"+productDetail.getVendor().getVendorEmail()+"</th></tr><tr><th>Stock Count: </th><th>"+productDetail.getProductStockCount()+"</th></tr>"
					+ "<tr><th>Limit Value: </th><th>"+productDetail.getProductThresholdValue()+"</th></tr></table><br><br>"
					+ "<center><b><i>This message was system-generated. Do not reply to this email.</i> </b></center>"; 
			
			return content;
			
		}

		//Returns list of Tracker
		public List<ProductTrackerDTO> getAllProductTrackers() {
			// TODO Auto-generated method stub
			return mapper.toProductTrackerDtoList(repository.findAll(Sort.by(Sort.Direction.DESC, "id")));
		}
}
