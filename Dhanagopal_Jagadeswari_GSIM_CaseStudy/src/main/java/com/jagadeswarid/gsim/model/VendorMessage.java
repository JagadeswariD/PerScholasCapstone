package com.jagadeswarid.gsim.model;

import java.io.Serializable;
import java.time.Instant;

import gsim.gsim_producing_ws.AckStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vendormessages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorMessage implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "vm_id")
	private Long id;

	@NotEmpty
	@Size(max = 20)
	@Column(name = "p_name")
	private String productName;
	
	@NotEmpty
	@Size(max = 20)
	@Column(name = "v_name")
	private String vendorName;
	
	@NotEmpty
	@Size(max = 250)
	@Column(name = "v_email")
	private String vendorEmail;
	
	@NotNull
	@Column(name = "stock_count")
	private Long stockCount;

	@NotNull
	@Column(name = "price_per_box")
	private Float pricePerBox;
	
	@NotNull
	@Column(name = "stock_price")
	private Float stockPrice;
	
	@NotNull
	@Column(name = "currency")
	private String currency;
	
	@NotNull
	@Column(name = "tax")
	private Float tax;
	
	@NotNull
	@Column(name = "final_amount")
	private Float finalAmount;
	
	@NotNull
	@Column(name = "status")
	private AckStatus status;
	
	@Column(name="c_creation_date", nullable = false)
	private Instant creationDate;
	
	@Column(name="c_modified_date",  nullable = false)
	private Instant modifiedDate;

	public VendorMessage(@NotEmpty @Size(max = 20) String productName, @NotEmpty @Size(max = 20) String vendorName,
			@NotEmpty @Size(max = 250) String vendorEmail, @NotNull Long stockCount, @NotNull Float pricePerBox,
			@NotNull Float stockPrice, @NotNull String currency,@NotNull AckStatus status,  @NotNull Float tax, @NotNull Float finalAmount) {
		super();
		this.productName = productName;
		this.vendorName = vendorName;
		this.vendorEmail = vendorEmail;
		this.stockCount = stockCount;
		this.pricePerBox = pricePerBox;
		this.stockPrice = stockPrice;
		this.currency = currency;
		this.tax = tax;
		this.status=status;
		this.finalAmount = finalAmount;
		this.creationDate=Instant.now();
		this.modifiedDate = Instant.now();
	}

	
	
	
}
