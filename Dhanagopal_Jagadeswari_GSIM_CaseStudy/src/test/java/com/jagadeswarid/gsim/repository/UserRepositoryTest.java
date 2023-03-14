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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.jagadeswarid.gsim.model.User;

@ExtendWith(MockitoExtension.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {
	
	@Mock
	UserRepository userRepository;
	
	
	private User user;
    
    @BeforeEach
    public void setup(){
    	PasswordEncoder encoder = new BCryptPasswordEncoder();
    	user = new User(1L,"TestUserFName","TestUserLName","testuser","UserEmail@email.com",encoder.encode("test"),true);
    	
    }
    
    @DisplayName("User Repository : JUnit test for findByUsername method")
    @Test
    public void TestFindByUsername() {
    	//given
    	when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
    	
    	//when
    	Optional<User> userResult = userRepository.findByUsername(user.getUsername());
    	
    	//then
    	assertThat(userResult).isNotNull();
    	assertThat(userResult).hasValue(user);
    	
    	
    }
    
    @DisplayName("User Repository : JUnit test for existsByUsername method")
    @Test
    public void testExistsByUsername() {
    	//given
    	when(userRepository.existsByUsername(user.getUsername())).thenReturn(true);
    	
    	//when
    	boolean exists = userRepository.existsByUsername(user.getUsername());
    	
    	//then
    	assertThat(exists).isTrue();
    	
    	
    }
    
    @DisplayName("User Repository : JUnit test for existsByEmail method")
    @Test
    public void testExistsByEmail() {
    	//given
    	when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);
    	
    	//when
    	boolean exists = userRepository.existsByEmail(user.getEmail());
    	
    	//then
    	assertThat(exists).isTrue();
    	
    	
    }
}
