package com.jagadeswarid.gsim.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

import com.jagadeswarid.gsim.model.Product;


@ExtendWith(MockitoExtension.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ProductRepositoryTest {
	@Mock
	ProductRepository productRepository;
	
	private Product product;
	
	@BeforeEach
    public void setup(){
		product = new Product(1L,"ProductName","Product Desc",Instant.now(),Instant.now());
    	
    }
	
	 @DisplayName("Vendor Repository : JUnit test for existsByProductName method")
	    @Test
	   public void testExistsByProductName() {
	    	//given
	    	when(productRepository.existsByProductName(product.getProductName())).thenReturn(true);
	    	
	    	//when
	    	boolean exists = productRepository.existsByProductName(product.getProductName());
	    	
	    	//then
	    	assertThat(exists).isTrue();
	    	
	    	
	    }
	@DisplayName("User Repository : JUnit test for findByProductName method")
    @Test
    public void TestFindByProductName() {
    	//given
    	when(productRepository.findByProductName(product.getProductName())).thenReturn(Optional.of(product));
    	
    	//when
    	Optional<Product> productResult = productRepository.findByProductName(product.getProductName());
    	
    	//then
    	assertThat(productResult).isNotNull();
    	assertThat(productResult).hasValue(product);
    	
    	
    }
}
