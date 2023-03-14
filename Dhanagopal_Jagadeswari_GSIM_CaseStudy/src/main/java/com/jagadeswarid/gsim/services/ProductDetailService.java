package com.jagadeswarid.gsim.services;

import java.util.List;

import com.jagadeswarid.gsim.dto.ProductDetailDTO;

public interface ProductDetailService {
	public List<ProductDetailDTO> getAllProductDetails();

	public ProductDetailDTO createProductDetail(ProductDetailDTO productDetailDto);

	public ProductDetailDTO getProductDetailByID(Long id);

	public ProductDetailDTO updateProductDetail(Long id, ProductDetailDTO productDetailDto);

	public void deleteProductDetail(Long id);
}
