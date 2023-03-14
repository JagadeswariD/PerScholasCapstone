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
public class VendorDTO {
		Long id;

		@NotEmpty(message = "Vendor First Name is Mandatory!")
		@Size(max = 20)
		private String vendorFirstName;

		@NotEmpty(message = "Vendor Last Name is Mandatory!")
		@NotEmpty
		@Size(max = 20)
		private String vendorLastName;

		@NotEmpty(message = "Vendor Email is Mandatory!")
		@NotEmpty
		@Size(max = 250)
		private String vendorEmail;

		private boolean vendorStatus;
		
		private Instant creationDate;
		private Instant modifiedDate;
	}
