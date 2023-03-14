package com.jagadeswarid.gsim.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@Data
@NoArgsConstructor
public class UserDTO {
	private Long id;
	@NotEmpty
	private String userFirstName;
	@NotEmpty
	private String userLastName;
	@Email
    @NotEmpty
	private String email;
	@NotEmpty
	private String password;
	
	@NotEmpty
	private String role;
	
	@NotEmpty
	private String username;
	}
