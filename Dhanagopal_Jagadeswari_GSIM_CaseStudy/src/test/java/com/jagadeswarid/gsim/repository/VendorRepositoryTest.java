package com.jagadeswarid.gsim.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import com.jagadeswarid.gsim.model.Vendor;

@ExtendWith(MockitoExtension.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class VendorRepositoryTest {
	
	@Mock
	VendorRepository vendorRepository;
	
	private Vendor vendor;
	
	@BeforeEach
    public void setup(){
    	vendor = new Vendor(1L,"TestVendorFName","TestVendorLName","UserEmail@email.com",true,Instant.now(),Instant.now());
    	
    }
	
	 @DisplayName("Vendor Repository : JUnit test for existsByVendorEmail method")
	    @Test
	   public void testExistsByVendorEmail() {
	    	//given
	    	when(vendorRepository.existsByVendorEmail(vendor.getVendorEmail())).thenReturn(true);
	    	
	    	//when
	    	boolean exists = vendorRepository.existsByVendorEmail(vendor.getVendorEmail());
	    	
	    	//then
	    	assertThat(exists).isTrue();
	    	
	    	
	    }
	@DisplayName("User Repository : JUnit test for findByVendorEmail method")
    @Test
    public void TestFindByVendorEmail() {
    	//given
    	when(vendorRepository.findByVendorEmail(vendor.getVendorEmail())).thenReturn(Optional.of(vendor));
    	
    	//when
    	Optional<Vendor> vendorResult = vendorRepository.findByVendorEmail(vendor.getVendorEmail());
    	
    	//then
    	assertThat(vendorResult).isNotNull();
    	assertThat(vendorResult).hasValue(vendor);
    	
    	
    }

}
