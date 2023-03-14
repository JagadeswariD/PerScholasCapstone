package com.jagadeswarid.gsim.services;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.mockito.junit.jupiter.MockitoExtension;

import com.jagadeswarid.gsim.dto.CategoryDTO;
import com.jagadeswarid.gsim.mapper.CategoryMapper;
import com.jagadeswarid.gsim.model.Category;
import com.jagadeswarid.gsim.repository.CategoryRepository;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {

	@Mock
	private CategoryRepository categoryRepository;
	
	@Mock
	private CategoryMapper categoryMapper;

	@InjectMocks
	private CategoryService categoryService;
	
	private Category category;
	private CategoryDTO categoryDto;

	@BeforeEach
    public void setup(){
        category = new Category(1L, "Beverages", "Provides List of Beverages", Instant.now(), Instant.now());
        categoryDto = new CategoryDTO(1L, "Beverages", "Provides List of Beverages", Instant.now(), Instant.now());
                
    }
	
	
	 // JUnit test for getAllCategories method 
	@DisplayName("JUnit test for getAllCategories method")
	@Test
	public void givenCategoryList_whenGetAllCategories_thenReturnCategoryDTOList() {
		
		// precondition or setup
		
		Category category2 = new Category(2L, "Snacks", "Provides List of Snacks", Instant.now(), Instant.now());
		
		List<Category> categoryList = new ArrayList<>();
		categoryList.add(category);
		categoryList.add(category2);
		
		List<CategoryDTO> categoryDto = new ArrayList<>();
		categoryDto.add(categoryMapper.toCategoryDto(category));
		categoryDto.add(categoryMapper.toCategoryDto(category2));
		
		//given
		when(categoryRepository.findAll()).thenReturn(List.of(category,category2));
		when(categoryMapper.toCategoryDtoList(categoryList)).thenReturn(categoryDto);
		
		
        // when -  action or the behavior that we are going test
        List<CategoryDTO> categoryListResult = categoryService.getAllCategories();
        
        // then - verify the output
        assertThat(categoryListResult).isNotNull();
        assertThat(categoryListResult.size()).isEqualTo(2);
	}
	
	// JUnit test for getAllCategories method 
	
	@DisplayName("JUnit test for getAllCategories method (negative scenario)")
    @Test
    public void givenEmptyCategoriesList_whenGetAllCategories_thenReturnEmptyCategoryDTOList(){
        // given - precondition or setup
		given(categoryRepository.findAll()).willReturn(Collections.emptyList());

        // when -  action or the behavior that we are going test
        List<CategoryDTO> categoryDtoListResult = categoryService.getAllCategories();

        // then - verify the output
        assertThat(categoryDtoListResult).isEmpty();
        assertThat(categoryDtoListResult.size()).isEqualTo(0);
    }
	
	
	 // JUnit test for getCategoryByID method
    @DisplayName("JUnit test for getCategoryByID method")
    @ParameterizedTest
    @MethodSource("categoryProvider")
    public void givenCagegoryId_whenGetCategoryById_thenReturnCategoryDTOObject(CategoryDTO categoryDto){
    	
    	Long categoryID = categoryDto.getId();
    	Category category = new Category(categoryDto.getId(),categoryDto.getCategoryName(),categoryDto.getCategoryDescription(),categoryDto.getCreationDate(),categoryDto.getModifiedDate());
        
    	// given
        given(categoryRepository.findById(categoryID)).willReturn(Optional.of(category));
        given(categoryMapper.toCategoryDto(categoryRepository.findById(categoryID).get())).willReturn(categoryDto);

        // when
        CategoryDTO categoryDtoResult = categoryService.getCategoryByID(categoryID);

        // then
        assertThat(categoryDtoResult).isNotNull();
        Assertions.assertEquals(categoryDto, categoryDtoResult);

    }
    
    static Stream<CategoryDTO> categoryProvider() {
        return Stream.of(
                new CategoryDTO(1L, "Diary", "Diary Products", Instant.now(), Instant.now()),
                new CategoryDTO(2L, "Breakfast & Cereal", "Breakfast & Cereal Products", Instant.now(), Instant.now()),
                new CategoryDTO(3L, "Frozen", "Frozen Products", Instant.now(), Instant.now())
        );
    }

    // JUnit test for createCategory method
    @DisplayName("JUnit test for createCategory method")
    @Test
    public void givenCategoryDTOObject_whenCreateCategory_thenReturnCategoryDTOObject(){
        
    	// given - precondition or setup
        given(categoryMapper.toCategoryEntity(categoryDto)).willReturn(category);
        given(categoryRepository.save(categoryMapper.toCategoryEntity(categoryDto))).willReturn(category);
        given(categoryMapper.toCategoryDto(categoryRepository.save(categoryMapper.toCategoryEntity(categoryDto)))).willReturn(categoryDto);
       
        // when -  action or the behavior that we are going test
        
        CategoryDTO savedCategoryDto = categoryService.createCategory(categoryDto);

        // then - verify the output
        assertThat(savedCategoryDto).isNotNull();
    }
    
    // JUnit test for updateCategory method
    @DisplayName("JUnit test for updateCategory method")
    @Test
    public void givenCategoryObject_whenUpdateCategory_thenReturnUpdatedCategoryDTO(){
        
    	// given - precondition or setup
    	given(categoryRepository.findById(1L)).willReturn(Optional.of(category));
        given(categoryRepository.save(category)).willReturn(category);
        given(categoryMapper.toCategoryDto(categoryRepository.save(category))).willReturn(categoryDto);
        
        category.setCategoryDescription("Updated description");
        categoryDto.setCategoryDescription("Updated description");
       
        // when -  action or the behavior that we are going test
        CategoryDTO updatedCategoryDto = categoryService.updateCategory(1L, categoryDto);

        // then - verify the output
        assertThat(updatedCategoryDto.getCategoryDescription()).isEqualTo("Updated description");
        
    }

    
    // JUnit test for deleteCategory method
    @DisplayName("JUnit test for deleteCategory method")
    @Test
    public void givenCategoryId_whenDeleteCategory_thenNothing(){
        
    	// given - precondition or setup
        long categoryId = 1L;

        willDoNothing().given(categoryRepository).deleteById(categoryId);

        // when -  action or the behavior that we are going test
        categoryService.deleteCategory(categoryId);

        // then - verify the output
        verify(categoryRepository, times(1)).deleteById(categoryId);
    }
}
