package com.jagadeswarid.gsim.mapper;



import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.stereotype.Component;

import com.jagadeswarid.gsim.dto.UserDTO;
import com.jagadeswarid.gsim.model.User;


@Component
@Mapper(componentModel = "spring")
public interface UserMapper {
	
	@Mappings(value = {
			@Mapping(target = "role", expression = "java(user.getRole().stream().map(p -> String.valueOf(p.getName())).collect(java.util.stream.Collectors.joining(\",\")))"),
			@Mapping(target = "password", expression = "java(new String())")
		  })
	UserDTO toUserDto(User user);
		
//	@Mappings(value = {
//			@Mapping(target = "role", expression = "java(userDto.getRole()equals(\"ROLE_USER\") ? (java.util.Set<com.jagadeswarid.gsim.model.Role>) repo.findByName(\"ROLE_USER\").orElse(null)"
//					+ "	 : (java.util.Set<com.jagadeswarid.gsim.model.Role>) repo.findByName(\"ROLE_ADMIN\").orElse(null))")
//			
//      })
//	User toUserEntity(UserDTO userDto, RoleRepository repo);

	List<UserDTO> toUserDtoList(List<User> user);
}