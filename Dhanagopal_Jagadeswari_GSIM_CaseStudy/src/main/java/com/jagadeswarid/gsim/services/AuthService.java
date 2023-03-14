package com.jagadeswarid.gsim.services;

import java.util.List;

import com.jagadeswarid.gsim.dto.LoginDTO;
import com.jagadeswarid.gsim.dto.SignupDTO;
import com.jagadeswarid.gsim.dto.UserDTO;
import com.jagadeswarid.gsim.response.JwtResponse;


public interface AuthService {
	
	public  JwtResponse authenticateUser(LoginDTO loginRequest);

	public boolean existsByUsername(String username) ;
	
	public boolean existsByEmail(String email) ;
	
	public void createUser(SignupDTO signUpRequest);
	
	public List<UserDTO> getAllUsers();

	public UserDTO getUserByID(Long id);

	public void deleteUser(Long id) ;

	public UserDTO updateUser(Long id,SignupDTO userDto);
}
