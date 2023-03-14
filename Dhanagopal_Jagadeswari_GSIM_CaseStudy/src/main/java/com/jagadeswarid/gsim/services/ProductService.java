package com.jagadeswarid.gsim.services;


import java.util.List;

import com.jagadeswarid.gsim.dto.ProductDTO;

public interface ProductService {
	public List<ProductDTO> getAllProducts();

	public ProductDTO createProduct(ProductDTO productDto);

	public ProductDTO getProductByID(Long id) ;
	
	public boolean getProductByName(String productName);
	
	public ProductDTO getProductByNameReturnDTO(String productName);
	
	public ProductDTO updateProduct(Long id, ProductDTO productDto) ;

	public void deleteProduct(Long id);

	

}
