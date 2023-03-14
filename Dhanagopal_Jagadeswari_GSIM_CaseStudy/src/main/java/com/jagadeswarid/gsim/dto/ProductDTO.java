package com.jagadeswarid.gsim.dto;


import java.time.Instant;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductDTO {

	private Long id;

	@NotEmpty(message = "Product Name is Mandatory!")
	@Size(max = 20)
	private String productName;
	
	@Size(max = 250)
	private String productDescription;
	
	private Instant creationDate;
	private Instant modifiedDate;
}
