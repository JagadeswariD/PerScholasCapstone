Capstone Project : Grocery Store Inventory Management

	 The Grocery Store Inventory Management project, built using Spring Boot, is a software application that helps grocery store owners manage their inventory of products. It typically involves creating a database of products, managing stock levels, maintaining vendor information and managing user access details. The application uses Spring Data JPA for database access, Spring Security for authentication and authorization, Spring RESTful API that enables the front-end application to communicate with the back-end and React for Frontend. A scheduler is implemented to check the stock levels periodically.  Overall, the Grocery Store Inventory Management project built using Spring Boot, helps the grocery store owners streamline their operations and make informed decisions based on real-time data about their inventory.


Business Usecase:

	#Inventory Management: Tool that helps grocery stores to create and manage products, categories, vendor information. It helps in monitoring the items below stock limit and alert the grocery store owner by email.
	
	#Vendor Management: Create a system to manage relationships with grocery store vendors. The system can help ensure that the store always has the right products in stock.

Technical Perspective:

	Project was built using agile methodolgy, using JIRA to track down the task progress for each Sprint. 

	1. Spring Security using JWT Token for user authentication and authorization.
	2. @RestControllers are configured with endpoints to handle incoming request from front-end.
	3. @Service class used to handle business logic, which includes CRUD operations based on business scenario.
	4. @EnableScheduling - Scheduler used to check ProductDetail entity for stock count against threshold limit. Based on Level of alert set in properties file email will be 		triggered.
	5. Multi-part file upload is implemented to upload image zip files to servers local dir. A scheduler is in place to extract the uploaded zip file and move them to destination dir.
	6. @EnableWs - SOAP Webservice is used to receive vendor messages from vendors on new stock information.
	7. MapStruct - to map DTO and entity objects
	8. Mockito - For testing methods in repository and service classes.
	9. React for front-end UI
		- used axios to make HTTP request to server for CRUD operations.
		- Extensively used BootStrap React for responsive design
		- Handling JWT token for HTTP request and expiration time
		- Role based UI access.
	10. Handled Exception using custom exception class
	11. Slf4j log is used to save the logs in file.
	

Additional Features for Future:

	#Vendor Billing Information: Involves handling of incoming invoices from arrival to payment.

	#Purchase order number: If the goods or services were ordered using a purchase order, the purchase order number should be included on the invoice for easy reference
	
	#Customer Demand Analysis Report: The analysis can help grocery stores better understand their customers and make data-driven decisions about inventory management.

	#Automated Ordering System: An automated system that makes request to vendors based on stock availability. 


Challenges you endered:

	#Learned React to implement the front-end of my application.
	
	#Successfully used SOAP Web Service to receive vendor message.
	
	#Used SMTP server to email ALERT messages on product stock 

	#Used MapStruct mapper class to map DTO and entity objects

	#Explored Jira Project Management 

	
	
	
	
		
