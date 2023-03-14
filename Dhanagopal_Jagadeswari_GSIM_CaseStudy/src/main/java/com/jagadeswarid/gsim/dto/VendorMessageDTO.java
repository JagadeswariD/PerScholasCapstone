package com.jagadeswarid.gsim.dto;

import java.time.Instant;

import gsim.gsim_producing_ws.AckStatus;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class VendorMessageDTO {

	private Long id;

	@NotEmpty
	private String productName;
	
	@NotEmpty
	private String vendorName;
	
	@NotEmpty
	private String vendorEmail;
	
	@NotNull
	private Long stockCount;

	@NotNull
	private Float pricePerBox;
	
	@NotNull
	private Float stockPrice;
	
	@NotNull
	@Column(name = "currency")
	private String currency;
	
	@NotNull
	private Float tax;
	
	@NotNull
	private Float finalAmount;
	
	@NotNull
	private AckStatus status;
	
	private Instant creationDate;
	
	private Instant modifiedDate;

	

}
