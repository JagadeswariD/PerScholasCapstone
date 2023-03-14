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

import com.jagadeswarid.gsim.dto.CategoryDTO;
import com.jagadeswarid.gsim.exception.ResourceNotFoundException;
import com.jagadeswarid.gsim.response.MessageResponse;
import com.jagadeswarid.gsim.services.CategoryService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	@Autowired
	private CategoryService service;
	
	Logger logger = LoggerFactory.getLogger(CategoryController.class);
	
	// get all categories
	@GetMapping("/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<CategoryDTO>> getAllCategories(){
		return ResponseEntity.ok(service.getAllCategories());
	}		
	
	// create category rest api
	@PostMapping("/")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryDTO categoryDto) {
		if(service.getCategoryByName(categoryDto.getCategoryName()))
			return ResponseEntity.badRequest().body(new MessageResponse("Error: CategoryName is already taken!"));
		return ResponseEntity.ok(service.createCategory(categoryDto));
	}
	
	// get category by id rest api
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
		CategoryDTO category = service.getCategoryByID(id);
		
		if(category.equals(null)) {
				new ResourceNotFoundException("Category does not exist with id :" + id);
				return ResponseEntity.badRequest().body(new MessageResponse("Error: Category does not exist with id :" + id));
		}
		return ResponseEntity.ok(category);
	}
	
	// update category rest api
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryDTO categoryDto){
		if(service.getCategoryByID(id).equals(null)) {
			new ResourceNotFoundException("Category does not exist with id :" + id);
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Category does not exist with id :" + id));
		}
		if(service.getCategoryByName(categoryDto.getCategoryName())) {
			if(service.getCategoryByNameReturnDTO(categoryDto.getCategoryName()).getId()!=id)
				return ResponseEntity.badRequest().body(new MessageResponse("Error: CategoryName is already taken!"));
		}
		return ResponseEntity.ok(service.updateCategory(id, categoryDto));
	}
	
	// delete employee rest api
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteCategory(@PathVariable Long id){
		if(service.getCategoryByID(id).equals(null)) {
			new ResourceNotFoundException("Category does not exist with id :" + id);
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Category does not exist with id :" + id));
		}
		service.deleteCategory(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}