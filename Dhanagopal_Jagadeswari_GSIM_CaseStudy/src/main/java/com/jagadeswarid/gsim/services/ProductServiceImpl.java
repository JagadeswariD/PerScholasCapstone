package com.jagadeswarid.gsim.services;

import java.time.Instant;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jagadeswarid.gsim.dto.ProductDTO;
import com.jagadeswarid.gsim.exception.ResourceNotFoundException;
import com.jagadeswarid.gsim.mapper.ProductMapper;
import com.jagadeswarid.gsim.model.Product;
import com.jagadeswarid.gsim.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService{
	@Autowired
	private ProductMapper mapper;
	@Autowired
	private ProductRepository repository;
	
	Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);
	
	//Returns all the products
	public List<ProductDTO> getAllProducts() {
		logger.info("getAllProducts is called");
		return mapper.toProductDtoList(repository.findAll());
		
	}

	//Creates a Product
	@Transactional
	public ProductDTO createProduct(ProductDTO productDto) {
		logger.info("Product to be created :" +productDto.toString());
		Product product = mapper.toProductEntity(productDto);
		return mapper.toProductDto(repository.save(product));
	}

	//Returns a product by id
	public ProductDTO getProductByID(Long id) {
		logger.info("Product to be getProductByID:" +id);
		Product product = repository.findById(id).get();
		return mapper.toProductDto(product);
	}

	//Returns product by name
	public boolean getProductByName(String productName) {
		logger.info("Product to be getProductByName :" +productName);
		return repository.existsByProductName(productName);
	}
	
	//Returns product by name
	public ProductDTO getProductByNameReturnDTO(String productName) {
		logger.info("Product to be getProductByName :" +productName);
		return mapper.toProductDto(repository.findByProductName(productName).get());
	}
	
	// Updates Product
	@Transactional
	public ProductDTO updateProduct(Long id, ProductDTO productDto) {
		logger.info("Product to be updated : "+ id);
		Product product =repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product does not exist with id :" + id));
		product.setProductName(productDto.getProductName());
		product.setModifiedDate(Instant.now());
		product.setProductDescription(productDto.getProductDescription());
		return mapper.toProductDto(repository.save(product));
		
	}

	//Deletes Product
	public void deleteProduct(Long id) {
		logger.info("Product to be deleted :" +id);
		repository.deleteById(id);
	}

	

}
