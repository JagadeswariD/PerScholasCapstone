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

import com.jagadeswarid.gsim.dto.VendorDTO;
import com.jagadeswarid.gsim.exception.ResourceNotFoundException;
import com.jagadeswarid.gsim.response.MessageResponse;
import com.jagadeswarid.gsim.services.VendorService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/vendors")
public class VendorController {

	Logger logger = LoggerFactory.getLogger(VendorController.class);
	
	@Autowired
	private VendorService service;
	
	// get all vendors
	@GetMapping("/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
		public ResponseEntity<List<VendorDTO>> getAllVendors(){
		return ResponseEntity.ok(service.getAllVendors());
	}		
	
	// create vendor rest api
	@PostMapping("/")
	@PreAuthorize("hasRole('MODERATOR')")
	public ResponseEntity<?> createVendor(@Valid @RequestBody VendorDTO vendorDto) {
		if(service.getVendorByEmail(vendorDto.getVendorEmail()))
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Vendor Email is already taken!"));
		return ResponseEntity.ok(service.createVendor(vendorDto));
	}
	
	// get vendor by id rest api
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getVendorById(@PathVariable Long id) {
		VendorDTO vendor = service.getVendorByID(id);
		
		if(vendor.equals(null)) {
				new ResourceNotFoundException("Vendor does not exist with id :" + id);
				return ResponseEntity.badRequest().body(new MessageResponse("Error: Vendor does not exist with id :" + id));
		}
		return ResponseEntity.ok(vendor);
	}
	
	// update vendor rest api
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateVendor(@PathVariable Long id,@Valid @RequestBody VendorDTO vendorDto){
		if(service.getVendorByID(id).equals(null)) {
			new ResourceNotFoundException("Vendor does not exist with id :" + id);
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Vendor does not exist with id :" + id));
		}
		if(service.getVendorByEmail(vendorDto.getVendorEmail())) {
			if(service.getVendorByEmailReturnDTO(vendorDto.getVendorEmail()).getId()!=id)
				return ResponseEntity.badRequest().body(new MessageResponse("Error: Vendor email is already taken!"));
		}
		return ResponseEntity.ok(service.updateVendor(id, vendorDto));
	}
	
	// delete employee rest api
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteVendor(@PathVariable Long id){
		if(service.getVendorByID(id).equals(null)) {
			new ResourceNotFoundException("Vendor does not exist with id :" + id);
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Vendor does not exist with id :" + id));
		}
		service.deleteVendor(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}