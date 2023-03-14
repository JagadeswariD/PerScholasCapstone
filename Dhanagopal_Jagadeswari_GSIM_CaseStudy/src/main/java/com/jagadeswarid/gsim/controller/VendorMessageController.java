package com.jagadeswarid.gsim.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jagadeswarid.gsim.dto.VendorMessageDTO;
import com.jagadeswarid.gsim.exception.ResourceNotFoundException;
import com.jagadeswarid.gsim.response.MessageResponse;
import com.jagadeswarid.gsim.services.VendorMessageService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/vendormessage")
public class VendorMessageController {

	@Autowired
	private VendorMessageService service;
	
	// get all products
	@GetMapping("/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<VendorMessageDTO>> getAllVendorMessage(){
		return ResponseEntity.ok(service.getAllVendorMessage());
	}		
	
	// get vendor Message by id rest api
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getVendorMessageById(@PathVariable Long id) {
		VendorMessageDTO vendorMessage = service.getVendorMessageByID(id);
		
		if(vendorMessage.equals(null)) {
				new ResourceNotFoundException("VendorMessage does not exist with id :" + id);
				return ResponseEntity.badRequest().body(new MessageResponse("Error: Vendor Message does not exist with id :" + id));
		}
		return ResponseEntity.ok(vendorMessage);
	}
	
	// update vendor rest api

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateVendorMessage(@PathVariable Long id,@Valid @RequestBody VendorMessageDTO vendorMessageDto){
		if(service.getVendorMessageByID(id).equals(null)) {
			new ResourceNotFoundException("VendorMessage does not exist with id :" + id);
			return ResponseEntity.badRequest().body(new MessageResponse("Error: VendorMessage does not exist with id :" + id));
		}
		
		return ResponseEntity.ok(service.updateVendorMessage(id, vendorMessageDto));
	}
	

}