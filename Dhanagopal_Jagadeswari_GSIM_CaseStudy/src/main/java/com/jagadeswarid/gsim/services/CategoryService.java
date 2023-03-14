package com.jagadeswarid.gsim.services;


import java.util.List;
import com.jagadeswarid.gsim.dto.CategoryDTO;

public interface CategoryService {
	
	
	public List<CategoryDTO> getAllCategories();
	
	public CategoryDTO createCategory(CategoryDTO categoryDto) ;
	
	public CategoryDTO getCategoryByID(Long id);
	
	public boolean getCategoryByName(String categoryName);
	
	public CategoryDTO getCategoryByNameReturnDTO(String categoryName) ;
	
	public CategoryDTO updateCategory(Long id, CategoryDTO categoryDto) ;

	public void deleteCategory(Long id) ;

}
