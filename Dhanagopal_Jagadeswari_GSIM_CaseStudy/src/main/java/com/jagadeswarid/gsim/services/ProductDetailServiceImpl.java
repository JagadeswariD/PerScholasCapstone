package com.jagadeswarid.gsim.services;

import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jagadeswarid.gsim.dto.ProductDetailDTO;
import com.jagadeswarid.gsim.exception.ResourceNotFoundException;
import com.jagadeswarid.gsim.mapper.ProductDetailMapper;
import com.jagadeswarid.gsim.model.Category;
import com.jagadeswarid.gsim.model.Product;
import com.jagadeswarid.gsim.model.ProductDetail;
import com.jagadeswarid.gsim.model.Vendor;
import com.jagadeswarid.gsim.repository.CategoryRepository;
import com.jagadeswarid.gsim.repository.ProductDetailRepository;
import com.jagadeswarid.gsim.repository.ProductRepository;
import com.jagadeswarid.gsim.repository.VendorRepository;

@Service
public class ProductDetailServiceImpl implements ProductDetailService{
	@Autowired
	private ProductDetailMapper mapper;
	@Autowired
	private ProductDetailRepository repository;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	@Autowired
	private VendorRepository vendorRepository;
	
	
	
	public List<ProductDetailDTO> getAllProductDetails() {
		// TODO Auto-generated method stub
		return mapper.toProductDetailDtoList(repository.findAll());
		
	}

	@Transactional
	public ProductDetailDTO createProductDetail(ProductDetailDTO productDetailDto) {
		// TODO Auto-generated method stub
		ProductDetail productDetail = mapper.toProductDetailEntity(productDetailDto);
		Product product = productRepository.findById(productDetailDto.getProductid()).orElseThrow(() -> new ResourceNotFoundException("Product does not exist with id :" + productDetailDto.getProductid()));
		Category category = categoryRepository.findById(productDetailDto.getCategoryid()).orElseThrow(() -> new ResourceNotFoundException("Category does not exist with id :" + productDetailDto.getCategoryid()));
		Vendor vendor = vendorRepository.findById(productDetailDto.getVendorid()).orElseThrow(() -> new ResourceNotFoundException("Vendor does not exist with id :" + productDetailDto.getVendorid()));
		productDetail.setCategory(category);
		productDetail.setProduct(product);
		productDetail.setVendor(vendor);
		if(repository.existsByProductAndCategoryAndVendor(product,category,vendor))
			return null;
		
		ProductDetail saveProductDetail=repository.save(productDetail);
		return mapper.toProductDetailDto(saveProductDetail);
	}

	public ProductDetailDTO getProductDetailByID(Long id) {
		ProductDetail productDetail = repository.findById(id).get();
		return mapper.toProductDetailDto(productDetail);
	}
	
	@Transactional
	public ProductDetailDTO updateProductDetail(Long id, ProductDetailDTO productDetailDto) {
		// TODO Auto-generated method stub
		ProductDetail productDetailsToBeUpdated = repository.findById(id).get();
		Product product = productRepository.findById(productDetailDto.getProductid()).orElseThrow(() -> new ResourceNotFoundException("Product does not exist with id :" + productDetailDto.getProductid()));
		Category category = categoryRepository.findById(productDetailDto.getCategoryid()).orElseThrow(() -> new ResourceNotFoundException("Category does not exist with id :" + productDetailDto.getCategoryid()));
		Vendor vendor = vendorRepository.findById(productDetailDto.getVendorid()).orElseThrow(() -> new ResourceNotFoundException("Vendor does not exist with id :" + productDetailDto.getVendorid()));
		productDetailsToBeUpdated.setCategory(category);
		productDetailsToBeUpdated.setProduct(product);
		productDetailsToBeUpdated.setVendor(vendor);
		productDetailsToBeUpdated.setProductStockCount(productDetailDto.getProductStockCount());
		productDetailsToBeUpdated.setProductThresholdValue(productDetailDto.getProductThresholdValue());
		productDetailsToBeUpdated.setModifiedDate(Instant.now());
		
		return mapper.toProductDetailDto(repository.save(productDetailsToBeUpdated));
		
	}

	public void deleteProductDetail(Long id) {
		// TODO Auto-generated method stub
		repository.deleteById(id);
	}

}
