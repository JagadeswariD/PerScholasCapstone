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
public class CategoryDTO {

	private Long id;

	@NotEmpty(message = "Category Name is Mandatory!")
	@Size(max = 20)
	private String categoryName;

	@Size(max = 250)
	@NotEmpty(message = "Category Description is Mandatory!")
	private String categoryDescription;
	
	private Instant creationDate;
	private Instant modifiedDate;
}
