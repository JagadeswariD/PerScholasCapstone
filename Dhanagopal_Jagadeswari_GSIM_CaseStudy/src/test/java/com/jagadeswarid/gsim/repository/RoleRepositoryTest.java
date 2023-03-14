package com.jagadeswarid.gsim.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

import com.jagadeswarid.gsim.model.ERole;
import com.jagadeswarid.gsim.model.Role;

@ExtendWith(MockitoExtension.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class RoleRepositoryTest {
	@Mock
	RoleRepository roleRepository;
	
	
	private Role role;
    
    @BeforeEach
    public void setup(){
    	role = new Role(1,ERole.ROLE_ADMIN);
    	
    }
    
    @DisplayName("Role Repository : JUnit test for findByName method")
    @Test
    public void testFindByName() {
    	//given
    	when(roleRepository.findByName(ERole.ROLE_ADMIN)).thenReturn(Optional.of(role));
    	
    	//when
    	Optional<Role> roleResult = roleRepository.findByName(ERole.ROLE_ADMIN);
    	
    	//then
    	assertThat(roleResult).isNotNull();
    	assertThat(roleResult).hasValue(role);
    	
    	
    }
}
