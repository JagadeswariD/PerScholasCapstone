package com.jagadeswarid.gsim.dto;

import java.time.Instant;

import com.jagadeswarid.gsim.model.Category;
import com.jagadeswarid.gsim.model.EAlert;
import com.jagadeswarid.gsim.model.Product;
import com.jagadeswarid.gsim.model.Vendor;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductTrackerDTO {

	Long id;

	private Product product;

	private Category category;

	private Vendor vendor;
	
	private EAlert alertLevel;

	private Long pd_id;
	
	private Long productStockCount;

	private Long productThresholdValue;
	
	private Instant creationDate;

}
