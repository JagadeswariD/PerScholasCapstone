package com.jagadeswarid.gsim.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jagadeswarid.gsim.dto.SignupDTO;
import com.jagadeswarid.gsim.dto.UserDTO;
import com.jagadeswarid.gsim.exception.ResourceNotFoundException;
import com.jagadeswarid.gsim.response.MessageResponse;
import com.jagadeswarid.gsim.services.AuthService;

import jakarta.validation.Valid;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

	
	@Autowired
	private AuthService authService;
	
	Logger logger = LoggerFactory.getLogger(UserController.class);
	
	
	// get all employee
	@GetMapping("/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<UserDTO>> getAllUsers(){
		return ResponseEntity.ok(authService.getAllUsers());
	}		
	
	// create employee rest api
	@PostMapping("/")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> createUser(@Valid @RequestBody SignupDTO userDTO) {
		if (authService.existsByUsername(userDTO.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}

		if (authService.existsByEmail(userDTO.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}
		authService.createUser(userDTO);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	// get employee by id rest api
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getUserById(@PathVariable Long id) {
		UserDTO user = authService.getUserByID(id);
		
		if(user.equals(null)) {
				new ResourceNotFoundException("User does not exist with id :" + id);
				return ResponseEntity.badRequest().body(new MessageResponse("Error: User does not exist with id :" + id));
		}
		return ResponseEntity.ok(user);
	}
	
	// update employee rest api
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody SignupDTO userDto){
		
		if(authService.getUserByID(id).equals(null)) {
			new ResourceNotFoundException("User does not exist with id :" + id);
			return ResponseEntity.badRequest().body(new MessageResponse("Error: User does not exist with id :" + id));
		}
		if (authService.existsByUsername(userDto.getUsername())) {
			if (authService.existsByEmail(userDto.getEmail())) {
				if(authService.getUserByID(id).getId()!=id)
					return ResponseEntity.badRequest().body(new MessageResponse("Error: Email or Username is already in use!"));
			}
		}

			
		authService.updateUser(id, userDto);
		return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
	}
	
	// delete employee rest api
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteUser(@PathVariable Long id){
		if(authService.getUserByID(id).equals(null)) {
			new ResourceNotFoundException("User does not exist with id :" + id);
			return ResponseEntity.badRequest().body(new MessageResponse("Error: User does not exist with id :" + id));
		}
		authService.deleteUser(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}