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

import com.jagadeswarid.gsim.dto.ProductDetailDTO;
import com.jagadeswarid.gsim.exception.ResourceNotFoundException;
import com.jagadeswarid.gsim.response.MessageResponse;
import com.jagadeswarid.gsim.services.ProductDetailService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/productdetails")
public class ProductDetailController {

	@Autowired
	private ProductDetailService service;
	
	Logger logger = LoggerFactory.getLogger(ProductDetailController.class);
	
	// get all products
	@GetMapping("/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<ProductDetailDTO>> getAllProductDetails(){
		return ResponseEntity.ok(service.getAllProductDetails());
	}		
	
	// create product rest api
	@PostMapping("/")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> createProduct(@RequestBody ProductDetailDTO productDetailDto) {
		ProductDetailDTO productDetail= service.createProductDetail(productDetailDto);
		if(productDetail==null)
		{
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Product, Vendor, Category combination already taken!"));
		}
		return ResponseEntity.ok(productDetail);
	}
	
	// get product by id rest api
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getProductById(@PathVariable Long id) {
		ProductDetailDTO productDetail = service.getProductDetailByID(id);
		
		if(productDetail.equals(null)) {
				return ResponseEntity.badRequest().body(new MessageResponse("Error: Category does not exist with id :" + id));
		}
		return ResponseEntity.ok(productDetail);
	}
	
	// update product rest api
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDetailDTO productDetailDto){
		if(service.getProductDetailByID(id).equals(null)) {
			 new ResourceNotFoundException("Product Detail does not exist with id :" + id);
			 return ResponseEntity.badRequest().body(new MessageResponse("Error: Product Detail does not exist with id :" + id));
		}
		ProductDetailDTO productDetail= service.updateProductDetail(id, productDetailDto);
		if(productDetail.equals(null))
		{
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Product, Vendor, Category combination already taken!"));
		}
		return ResponseEntity.ok(productDetail);
		
	}
	
	// delete employee rest api
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteProduct(@PathVariable Long id){
		if(service.getProductDetailByID(id).equals(null)) {
			new ResourceNotFoundException("Product Details does not exist with id :" + id);
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Product Details does not exist with id :" + id));
	
		}
			
		service.deleteProductDetail(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}