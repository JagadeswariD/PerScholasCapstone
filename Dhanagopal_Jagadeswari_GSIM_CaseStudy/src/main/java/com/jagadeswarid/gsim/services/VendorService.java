package com.jagadeswarid.gsim.services;

import java.time.Instant;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jagadeswarid.gsim.dto.VendorDTO;
import com.jagadeswarid.gsim.exception.ResourceNotFoundException;
import com.jagadeswarid.gsim.mapper.VendorMapper;
import com.jagadeswarid.gsim.model.Vendor;
import com.jagadeswarid.gsim.repository.VendorRepository;

@Service
public class VendorService {
	@Autowired
	private VendorMapper mapper;
	@Autowired
	private VendorRepository repository;
	
	Logger logger = LoggerFactory.getLogger(VendorService.class);
	
	//Returns all the vendors
	public List<VendorDTO> getAllVendors() {
		logger.info("getAllVendors is called");
		return mapper.toVendorDtoList(repository.findAll());
		
	}

	//Creates a Category
	@Transactional
	public VendorDTO createVendor(VendorDTO vendorDto) {
		logger.info("Vendor to be created :" +vendorDto.toString());
		Vendor vendor = mapper.toVendorEntity(vendorDto);
		return mapper.toVendorDto(repository.save(vendor));
	}

	//Returns a vendor by id
	public VendorDTO getVendorByID(Long id) {
		logger.info("Vendor to be getVendorByID:" +id);
		Vendor vendor = repository.findById(id).get();
		return mapper.toVendorDto(vendor);
	}
	
	//Returns vendor status by vendor email
	public boolean getVendorByEmail(String vendorEmail) {
		logger.info("Vendor to be getVendorByEmail :" +vendorEmail);
		return repository.existsByVendorEmail(vendorEmail);
	}

	//Returns Vendor by email
	public VendorDTO getVendorByEmailReturnDTO(String vendorEmail) {
		logger.info("Category to be getVendorByEmail :" +vendorEmail);
		return mapper.toVendorDto(repository.findByVendorEmail(vendorEmail).get());
	}
	
	// Updates Vendor
	@Transactional
	public VendorDTO updateVendor(Long id, VendorDTO vendorDto) {
		logger.info("Vendor to be updated : "+ id);
		Vendor vendor = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Vendor does not exist with id :" + id));
		vendor.setVendorFirstName(vendorDto.getVendorFirstName());
		vendor.setVendorLastName(vendorDto.getVendorLastName());
		vendor.setVendorEmail(vendorDto.getVendorEmail());
		vendor.setVendorStatus(vendorDto.isVendorStatus());
		vendor.setModifiedDate(Instant.now());
		return mapper.toVendorDto(repository.save(vendor));
		
	}

	//Delete Vendor
	public void deleteVendor(Long id) {
		logger.info("Vendor to be deleted :" +id);
		repository.deleteById(id);
	}

	

	

}
