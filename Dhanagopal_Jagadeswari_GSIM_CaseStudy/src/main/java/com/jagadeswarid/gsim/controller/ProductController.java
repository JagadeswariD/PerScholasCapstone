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

import com.jagadeswarid.gsim.dto.ProductDTO;
import com.jagadeswarid.gsim.exception.ResourceNotFoundException;
import com.jagadeswarid.gsim.response.MessageResponse;
import com.jagadeswarid.gsim.services.ProductService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductController {

	Logger logger = LoggerFactory.getLogger(ProductController.class);
	
	@Autowired
	private ProductService service;
	
	// get all products
	@GetMapping("/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<ProductDTO>> getAllProducts(){
		return ResponseEntity.ok(service.getAllProducts());
	}		
	
	// create product rest api
	@PostMapping("/")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> createProduct(@Valid @RequestBody ProductDTO productDto) {
		if(service.getProductByName(productDto.getProductName()))
			return ResponseEntity.badRequest().body(new MessageResponse("Error: ProductName is already taken!"));
		return ResponseEntity.ok(service.createProduct(productDto));
	}
	
	// get product by id rest api
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getProductById(@PathVariable Long id) {
		ProductDTO product = service.getProductByID(id);
		
		if(product.equals(null)) {
				new ResourceNotFoundException("Product does not exist with id :" + id);
				return ResponseEntity.badRequest().body(new MessageResponse("Error: Product does not exist with id :" + id));
		}
		return ResponseEntity.ok(product);
	}
	
	// update product rest api
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateProduct(@PathVariable Long id,@Valid @RequestBody ProductDTO productDto){
		if(service.getProductByID(id).equals(null)) {
			new ResourceNotFoundException("Product does not exist with id :" + id);
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Product does not exist with id :" + id));
		}
		if(service.getProductByName(productDto.getProductName())) {
			if(service.getProductByNameReturnDTO(productDto.getProductName()).getId()!=id)
				return ResponseEntity.badRequest().body(new MessageResponse("Error: ProductName is already taken!"));
		}
		return ResponseEntity.ok(service.updateProduct(id, productDto));
		
	}
	
	// delete employee rest api
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteProduct(@PathVariable Long id){
		if(service.getProductByID(id).equals(null)) {
			new ResourceNotFoundException("Product does not exist with id :" + id);
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Product does not exist with id :" + id));
		}
		service.deleteProduct(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}