package com.jagadeswarid.gsim.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.stereotype.Component;

import com.jagadeswarid.gsim.dto.ProductDetailDTO;
import com.jagadeswarid.gsim.model.ProductDetail;

@Component
@Mapper(componentModel = "spring", uses= {ProductMapper.class, CategoryMapper.class, VendorMapper.class})
public interface ProductDetailMapper {

	
	ProductDetailDTO toProductDetailDto(ProductDetail productDetail);

	@Mappings(value = { @Mapping(target = "creationDate", expression = "java(java.time.Instant.now())"),
			@Mapping(target = "modifiedDate", expression = "java(java.time.Instant.now())"), 
			@Mapping(target = "product.id", source="productDetailDto.productid"),
			@Mapping(target = "category.id", source="productDetailDto.categoryid"),
			@Mapping(target = "vendor.id", source="productDetailDto.vendorid")
	})
	ProductDetail toProductDetailEntity(ProductDetailDTO productDetailDto);

	List<ProductDetailDTO> toProductDetailDtoList(List<ProductDetail> productDetail);
}