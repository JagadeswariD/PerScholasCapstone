package com.jagadeswarid.gsim.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jagadeswarid.gsim.dto.LoginDTO;
import com.jagadeswarid.gsim.dto.SignupDTO;
import com.jagadeswarid.gsim.dto.UserDTO;
import com.jagadeswarid.gsim.exception.ResourceNotFoundException;
import com.jagadeswarid.gsim.mapper.UserMapper;
import com.jagadeswarid.gsim.model.ERole;
import com.jagadeswarid.gsim.model.Role;
import com.jagadeswarid.gsim.model.User;
import com.jagadeswarid.gsim.repository.RoleRepository;
import com.jagadeswarid.gsim.repository.UserRepository;
import com.jagadeswarid.gsim.response.JwtResponse;
import com.jagadeswarid.gsim.util.JwtUtils;

@Service
public class AuthServiceImpl implements AuthService{

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;
	
	@Autowired
	private UserMapper mapper;
	
	
	Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);
	
	//Method to Authenticate User
	public  JwtResponse authenticateUser(LoginDTO loginRequest) {
		logger.info("Authentication for username : "+loginRequest.getUsername());
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());
		return new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles);
	
	}

	//Method to check the existence of username
	public boolean existsByUsername(String username) {
		logger.info("existsByUsername method is called : "+username);
		return userRepository.existsByUsername(username);
	}

	//Method to check the existence of email
	public boolean existsByEmail(String email) {
		logger.info("existsByEmail method is called : "+email);
		return userRepository.existsByEmail(email);
	}
	
	// Create new user's account
	@Transactional
	public void createUser(SignupDTO signUpRequest) {
		try {
			logger.info("Create user for : " +signUpRequest.toString() );
			User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
					encoder.encode(signUpRequest.getPassword()));
			user.setUserFirstName(signUpRequest.getUserFirstName());
			user.setUserLastName(signUpRequest.getUserLastName());
			String strRoles = signUpRequest.getRole();
			Set<Role> roles = new HashSet<>();
	
			if (strRoles.equals("ROLE_USER")) {
				Role userRole = roleRepository.findByName(ERole.ROLE_USER)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				roles.add(userRole);
			} else {
				Role userRole = roleRepository.findByName(ERole.ROLE_ADMIN)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				roles.add(userRole);
			}
	
			user.setRole(roles);
			userRepository.save(user);
		}
		catch(Exception e) {
			logger.error(e.getMessage());
		}
	}
	
	//Returns list of User
	public List<UserDTO> getAllUsers() {
		logger.info(" getAllUsers is called");
		return mapper.toUserDtoList(userRepository.findAll());

	}


	//Return user details based on id
	public UserDTO getUserByID(Long id) {
		logger.info("getUserByID is called");
		User user = userRepository.findById(id).get();
		return mapper.toUserDto(user);
	}

	
	//Delete user by id
	public void deleteUser(Long id) {
		logger.info("delete UserByID is called");
		userRepository.deleteById(id);
	}

	public UserDTO updateUser(Long id,SignupDTO userDto) {
		logger.info("User to be updated : "+ id);
		User user =userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category does not exist with id :" + id));
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		user.setUserFirstName(userDto.getUserFirstName());
		user.setUserLastName(userDto.getUserLastName());
		user.setUsername(userDto.getUsername());
		String strRoles = userDto.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles.equals("ROLE_USER")) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			Role userRole = roleRepository.findByName(ERole.ROLE_ADMIN)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		}
		user.setRole(roles);
		return mapper.toUserDto(userRepository.save(user));

		
	}
}
