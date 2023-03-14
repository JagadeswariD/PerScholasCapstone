package com.jagadeswarid.gsim.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.stereotype.Component;

import com.jagadeswarid.gsim.dto.VendorDTO;
import com.jagadeswarid.gsim.model.Vendor;

@Component
@Mapper(componentModel = "spring")
public interface VendorMapper {

	VendorDTO toVendorDto(Vendor vendor);
	
	@Mappings(value = {
            @Mapping(target = "creationDate", expression = "java(java.time.Instant.now())"),
            @Mapping(target = "modifiedDate", expression = "java(java.time.Instant.now())")
      })
	Vendor toVendorEntity(VendorDTO vendorDto);

	List<VendorDTO> toVendorDtoList(List<Vendor> vendor);
}