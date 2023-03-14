package com.jagadeswarid.gsim.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jagadeswarid.gsim.dto.UserDTO;
import com.jagadeswarid.gsim.mapper.UserMapper;
import com.jagadeswarid.gsim.model.User;
import com.jagadeswarid.gsim.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserMapper mapper;
	@Autowired
	private UserRepository repository;

	public List<UserDTO> getAllUsers() {
		// TODO Auto-generated method stub
		return mapper.toUserDtoList(repository.findAll());

	}


	public UserDTO getUserByID(Long id) {
		User user = repository.findById(id).get();
		return mapper.toUserDto(user);
	}

	

	public void deleteUser(Long id) {
		// TODO Auto-generated method stub
		repository.deleteById(id);
	}


}
