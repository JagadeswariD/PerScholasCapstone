package com.jagadeswarid.gsim.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jagadeswarid.gsim.dto.VendorDTO;
import com.jagadeswarid.gsim.mapper.VendorMapper;
import com.jagadeswarid.gsim.model.Vendor;
import com.jagadeswarid.gsim.repository.VendorRepository;

@ExtendWith(MockitoExtension.class)
public class VendorServiceTest {
	@Mock
	private VendorRepository vendorRepository;
	
	@Mock
	private VendorMapper vendorMapper;

	@InjectMocks
	private VendorService vendorService;
	
	private Vendor vendor;
	
	@BeforeEach
    public void setup(){
		vendor = new Vendor(1L, "VendorFName","VendorLName","vendor@emial.com",true, Instant.now(), Instant.now());
		//vendorDto = new VendorDTO(1L, "VendorFName","VendorLName","vendor@emial.com",true, Instant.now(), Instant.now());
                
    }
	 // JUnit test for getAllCategories method 
	@DisplayName("JUnit test for getAllVendors method")
	@Test
	public void givenVendorList_whenGetAllVendors_thenReturnVendorDTOList() {
		
		// precondition or setup
		
		Vendor vendor2 = new Vendor(1L, "VendorFName","VendorLName","vendor@emial.com",true, Instant.now(), Instant.now());
		
		List<Vendor> vendorList = new ArrayList<>();
		vendorList.add(vendor);
		vendorList.add(vendor2);
		
		List<VendorDTO> vendorDto = new ArrayList<>();
		vendorDto.add(vendorMapper.toVendorDto(vendor));
		vendorDto.add(vendorMapper.toVendorDto(vendor2));
		
		//given
		when(vendorRepository.findAll()).thenReturn(List.of(vendor,vendor2));
		when(vendorMapper.toVendorDtoList(vendorList)).thenReturn(vendorDto);
		
		
        // when -  action or the behavior that we are going test
        List<VendorDTO> vendorListResult = vendorService.getAllVendors();
        
        // then - verify the output
        assertThat(vendorListResult).isNotNull();
        assertThat(vendorListResult.size()).isEqualTo(2);
	}
		
}
