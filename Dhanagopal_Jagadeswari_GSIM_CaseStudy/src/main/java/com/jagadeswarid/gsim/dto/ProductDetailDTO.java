package com.jagadeswarid.gsim.dto;

import com.jagadeswarid.gsim.model.Category;
import com.jagadeswarid.gsim.model.Product;
import com.jagadeswarid.gsim.model.Vendor;

import jakarta.validation.constraints.NotEmpty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductDetailDTO {

	Long id;

	private Product product;

	private Category category;

	private Vendor vendor;
	
	private Long productid;

	private Long categoryid;
	
	private Long vendorid;
	@NotEmpty
	private Long productStockCount;
	@NotEmpty
	private Long productThresholdValue;

	public ProductDetailDTO(Long id, Product product, Category category, Vendor vendor, Long productStockCount,
			Long productThresholdValue) {
		super();
		this.id = id;
		this.product = product;
		this.category = category;
		this.vendor = vendor;
		this.productStockCount = productStockCount;
		this.productThresholdValue = productThresholdValue;
	}

}
