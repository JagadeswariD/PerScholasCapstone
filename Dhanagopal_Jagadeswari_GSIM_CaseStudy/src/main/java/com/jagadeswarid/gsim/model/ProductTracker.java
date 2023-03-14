package com.jagadeswarid.gsim.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product_tracker")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductTracker {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pt_id")
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "p_id")
	private Product product;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "c_id")
	private Category category;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "v_id")
	private Vendor vendor;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 20, name = "pd_alert_level", nullable = false)
	private EAlert alertLevel;
	
	@NotNull
	@Column(name = "pd_id", nullable = false)
	private Long pd_id;
	
	@NotNull
	@Column(name = "pd_stock_count", nullable = false)
	Long productStockCount;

	@NotNull
	@Column(name = "pd_threshold_value", nullable = false)
	Long productThresholdValue;

	@Column(name = "pd_creation_date", nullable = false)
	private Instant creationDate;

	public ProductTracker( Long pd_id, Product product, Category category, Vendor vendor, EAlert alertLevel,
			@NotNull Long productStockCount, @NotNull Long productThresholdValue) {
		super();
		this.pd_id = pd_id;
		this.product = product;
		this.category = category;
		this.vendor = vendor;
		this.alertLevel = alertLevel;
		this.productStockCount = productStockCount;
		this.productThresholdValue = productThresholdValue;
		this.creationDate = Instant.now();
		this.modifiedDate = Instant.now();
	}

	@Column(name = "pd_modified_date", nullable = false)
	private Instant modifiedDate;

}
