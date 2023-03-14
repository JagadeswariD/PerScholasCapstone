package com.jagadeswarid.gsim.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import java.time.Instant;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jagadeswarid.gsim.dto.CategoryDTO;
import com.jagadeswarid.gsim.dto.ProductDTO;
import com.jagadeswarid.gsim.dto.ProductDetailDTO;
import com.jagadeswarid.gsim.dto.VendorDTO;
import com.jagadeswarid.gsim.mapper.ProductDetailMapper;
import com.jagadeswarid.gsim.model.Category;
import com.jagadeswarid.gsim.model.Product;
import com.jagadeswarid.gsim.model.ProductDetail;
import com.jagadeswarid.gsim.model.Vendor;
import com.jagadeswarid.gsim.repository.CategoryRepository;
import com.jagadeswarid.gsim.repository.ProductDetailRepository;
import com.jagadeswarid.gsim.repository.ProductRepository;
import com.jagadeswarid.gsim.repository.VendorRepository;

@ExtendWith(MockitoExtension.class)
public class ProductDetailServiceTest {

	@Mock
	private ProductDetailRepository productDetailRepository;
	@Mock
	private ProductRepository productRepository;
	@Mock
	private CategoryRepository categoryRepository;
	@Mock
	private VendorRepository vendorRepository;
	@Mock
	private ProductDetailMapper productDetailMapper;

	@InjectMocks
	private ProductDetailService productDetailService;
	
	private ProductDetail productDetail;
	private ProductDetailDTO productDetailDto;
	private Vendor vendor;
	private Product product;
	private Category category;
	private VendorDTO vendorDto;
	private ProductDTO productDto;
	private CategoryDTO categoryDto;

	@BeforeEach
    public void setup(){
		vendor = new Vendor(1L, "VendorFName","VendorLName","vendor@emial.com",true, Instant.now(), Instant.now());
		product = new Product(1L, "Coffee", "Belongs to Beverages", Instant.now(), Instant.now());
		category = new Category(1L, "Diary", "Diary Products", Instant.now(), Instant.now());
		vendorDto = new VendorDTO(1L, "VendorFName","VendorLName","vendor@emial.com",true, Instant.now(), Instant.now());
		productDto = new ProductDTO(1L, "Coffee", "Belongs to Beverages", Instant.now(), Instant.now());
		categoryDto = new CategoryDTO(1L, "Diary", "Diary Products", Instant.now(), Instant.now());
		
		productDetail = new ProductDetail(1L,product,category, vendor,250L,50L, Instant.now(), Instant.now());
        productDetailDto =  new ProductDetailDTO(1L,product,category, vendor,250L,50L);
                
    }
	
	 // JUnit test for createProductDetail method
   // @DisplayName("JUnit test for createProductDetail method")
   // @Test
    public void givenProductDetailObject_whenCreateProductDetails_thenReturnCreateProductDetailDTO(){
        
    	// given - precondition or setup
    	productDetailDto.setCategoryid(1L);
    	productDetailDto.setVendorid(1L);
    	productDetailDto.setProductid(1L);
    	given(productDetailRepository.findById(1L)).willReturn(Optional.of(productDetail));
    	given(productRepository.findById(productDto.getId())).willReturn(Optional.of(product));
    	given(vendorRepository.findById(vendorDto.getId())).willReturn(Optional.of(vendor));
    	given(categoryRepository.findById(categoryDto.getId())).willReturn(Optional.of(category));
        given(productDetailRepository.save(productDetail)).willReturn(productDetail);
        given(productDetailMapper.toProductDetailDto(productDetailRepository.save(productDetail))).willReturn(productDetailDto);
        given(productDetailMapper.toProductDetailEntity(productDetailDto)).willReturn(productDetail);
        
         // when -  action or the behavior that we are going test
        ProductDetailDTO updatedproductDetailDto = productDetailService.createProductDetail( productDetailDto);
        System.out.println(updatedproductDetailDto);
        
        // then - verify the output
        assertThat(updatedproductDetailDto.getProductStockCount()).isEqualTo(productDetailDto);
        
    }

}
