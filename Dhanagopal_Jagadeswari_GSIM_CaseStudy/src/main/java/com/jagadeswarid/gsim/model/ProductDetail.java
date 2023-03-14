package com.jagadeswarid.gsim.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "product_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pd_id")
	Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "p_id")
	private Product product;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "c_id")
	private Category category;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "v_id")
	private Vendor vendor;
	
	@NotNull
	@Column(name = "p_stock_count")
	Long productStockCount;

	@NotNull
	@Column(name = "p_threshold_value")
	Long productThresholdValue;
	
	@Column(name="p_creation_date", nullable = false)
	private Instant creationDate;
	
	@Column(name="p_modified_date",  nullable = false)
	private Instant modifiedDate;


}
