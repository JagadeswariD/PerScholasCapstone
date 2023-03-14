package com.jagadeswarid.gsim.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import java.time.Instant;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jagadeswarid.gsim.dto.ProductDTO;
import com.jagadeswarid.gsim.mapper.ProductMapper;
import com.jagadeswarid.gsim.model.Product;
import com.jagadeswarid.gsim.repository.ProductRepository;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {
	@Mock
	private ProductRepository productRepository;
	
	@Mock
	private ProductMapper productMapper;

	@InjectMocks
	private ProductService productService;
	
	private Product product;
	private ProductDTO productDto;

	@BeforeEach
    public void setup(){
		product = new Product(1L, "Coffee", "Belongs to Beverages", Instant.now(), Instant.now());
		productDto = new ProductDTO(1L, "Coffee", "Belongs to Beverages", Instant.now(), Instant.now());
                
    }
	
	 // JUnit test for getProductByID method
	@DisplayName("JUnit test for getProductByID method")
    @Test
	public void givenProductId_whenGetProductById_thenReturnProductDTOObject(){
        // given
        given(productRepository.findById(1L)).willReturn(Optional.of(product));
        given(productMapper.toProductDto(productRepository.findById(1L).get())).willReturn(productDto);

        // when
        ProductDTO productDtoResult = productService.getProductByID(1L);

        // then
        assertThat(productDtoResult).isNotNull();

    }
	
	
}
