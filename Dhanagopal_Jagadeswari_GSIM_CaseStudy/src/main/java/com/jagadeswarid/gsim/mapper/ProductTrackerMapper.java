package com.jagadeswarid.gsim.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.stereotype.Component;

import com.jagadeswarid.gsim.dto.ProductTrackerDTO;
import com.jagadeswarid.gsim.model.ProductTracker;

@Component
@Mapper(componentModel = "spring")
public interface ProductTrackerMapper {

	ProductTrackerDTO toProductTrackerDto(ProductTracker productTracker);
	
	@Mappings(value = {
            @Mapping(target = "creationDate", expression = "java(java.time.Instant.now())"),
            @Mapping(target = "modifiedDate", expression = "java(java.time.Instant.now())")
      })
	ProductTracker toProductTrackerEntity(ProductTrackerDTO productTrackerDto);

	List<ProductTrackerDTO> toProductTrackerDtoList(List<ProductTracker> productTracker);
}