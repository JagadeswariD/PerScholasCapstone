package com.jagadeswarid.gsim.services;

import java.time.Instant;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jagadeswarid.gsim.dto.CategoryDTO;
import com.jagadeswarid.gsim.exception.ResourceNotFoundException;
import com.jagadeswarid.gsim.mapper.CategoryMapper;
import com.jagadeswarid.gsim.model.Category;
import com.jagadeswarid.gsim.repository.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryMapper mapper;
	@Autowired
	private CategoryRepository repository;
	
	Logger logger = LoggerFactory.getLogger(CategoryService.class);
	
	//Returns all the categories
	public List<CategoryDTO> getAllCategories() {
		logger.info("getAllCategories is called");
		return mapper.toCategoryDtoList(repository.findAll());
		
	}
	
	//Creates a Category
	@Transactional
	public CategoryDTO createCategory(CategoryDTO categoryDto) {
		logger.info("Category to be created :" +categoryDto.toString());
		Category category = mapper.toCategoryEntity(categoryDto);
		return mapper.toCategoryDto(repository.save(category));
	}

	//Returns a category by id
	public CategoryDTO getCategoryByID(Long id) {
		logger.info("Category to be getCategoryByID:" +id);
		Category category = repository.findById(id).get();
		return mapper.toCategoryDto(category);
	}

	//Returns category by name
	public boolean getCategoryByName(String categoryName) {
		logger.info("Category to be getCategoryByName :" +categoryName);
		return repository.existsByCategoryName(categoryName);
	}
	
	//Returns category by name
		public CategoryDTO getCategoryByNameReturnDTO(String categoryName) {
			logger.info("Category to be getCategoryByName :" +categoryName);
			return mapper.toCategoryDto(repository.findByCategoryName(categoryName).get());
		}
	
	// Updates Category
	@Transactional
	public CategoryDTO updateCategory(Long id, CategoryDTO categoryDto) {
		logger.info("Category to be updated : "+ id);
		Category category =repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category does not exist with id :" + id));
		category.setCategoryName(categoryDto.getCategoryName());
		category.setCategoryDescription(categoryDto.getCategoryDescription());
		category.setModifiedDate(Instant.now());
		return mapper.toCategoryDto(repository.save(category));
	}

	//Deletes Category
	public void deleteCategory(Long id) {
		logger.info("Category to be deleted :" +id);
		repository.deleteById(id);
	}

}
