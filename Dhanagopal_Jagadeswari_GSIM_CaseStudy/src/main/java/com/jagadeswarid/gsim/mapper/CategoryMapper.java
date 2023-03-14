package com.jagadeswarid.gsim.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.stereotype.Component;

import com.jagadeswarid.gsim.dto.CategoryDTO;
import com.jagadeswarid.gsim.model.Category;

@Component
@Mapper(componentModel = "spring")
public interface CategoryMapper {

	CategoryDTO toCategoryDto(Category category);
	
	@Mappings(value = {
            @Mapping(target = "creationDate", expression = "java(java.time.Instant.now())"),
            @Mapping(target = "modifiedDate", expression = "java(java.time.Instant.now())")
      })
	Category toCategoryEntity(CategoryDTO categoryDto);

	List<CategoryDTO> toCategoryDtoList(List<Category> category);
}