package com.jagadeswarid.gsim.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jagadeswarid.gsim.dto.ProductTrackerDTO;
import com.jagadeswarid.gsim.services.ProductTrackerSchedulerService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/producttracker")
public class ProductTrackerController {

	@Autowired
	private ProductTrackerSchedulerService service;
	
	// get all products
	@GetMapping("/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<ProductTrackerDTO>> getAllProductTracker(){
		return ResponseEntity.ok(service.getAllProductTrackers());
	}		
	
	
	/*// delete employee rest api
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable Long id){
		if(service.getProductDetailByID(id).equals(null))
			throw new ResourceNotFoundException("Product does not exist with id :" + id);
		service.deleteProductDetail(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}*/
	
	
}