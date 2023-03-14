package com.jagadeswarid.gsim.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.stereotype.Component;

import com.jagadeswarid.gsim.dto.ProductDTO;
import com.jagadeswarid.gsim.model.Product;

@Component
@Mapper(componentModel = "spring")
public interface ProductMapper {

	ProductDTO toProductDto(Product product);
	
	@Mappings(value = {
            @Mapping(target = "creationDate", expression = "java(java.time.Instant.now())"),
            @Mapping(target = "modifiedDate", expression = "java(java.time.Instant.now())")
      })
	Product toProductEntity(ProductDTO productDto);

	List<ProductDTO> toProductDtoList(List<Product> product);
}