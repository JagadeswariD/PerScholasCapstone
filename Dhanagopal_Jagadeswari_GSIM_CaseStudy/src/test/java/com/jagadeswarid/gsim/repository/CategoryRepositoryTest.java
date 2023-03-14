package com.jagadeswarid.gsim.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Instant;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.jagadeswarid.gsim.model.Category;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class CategoryRepositoryTest {
	@Autowired
    private CategoryRepository categoryRepository;

    private Category category;
    
    @BeforeEach
    public void setup(){
    	category = new Category("DiaryTEST", "Diary Products", Instant.now(), Instant.now());
    	
    }
    
    @DisplayName("Category Repository : JUnit test for findByCategoryName method")
    @Test
    public void testFindByCategoryName() {
    	//given
    	categoryRepository.save(category);
    	
    	//when
    	Optional<Category> categoryResult = categoryRepository.findByCategoryName(category.getCategoryName());
    	
    	//then
    	assertThat(categoryResult).isNotNull();
    	assertThat(categoryResult).hasValue(category);
    	
    	categoryRepository.deleteById(categoryResult.get().getId());
    	
    }
}
