package com.jagadeswarid.gsim.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.stereotype.Component;

import com.jagadeswarid.gsim.dto.VendorMessageDTO;
import com.jagadeswarid.gsim.model.VendorMessage;

@Component
@Mapper(componentModel = "spring")
public interface VendorMessageMapper {

	VendorMessageDTO toVendorMessageDto(VendorMessage vendorMessage);
	
	@Mappings(value = {
            @Mapping(target = "creationDate", expression = "java(java.time.Instant.now())"),
            @Mapping(target = "modifiedDate", expression = "java(java.time.Instant.now())")
      })
	VendorMessage toVendorMessageEntity(VendorMessageDTO vendorMessageDto);

	List<VendorMessageDTO> toVendorMessageDtoList(List<VendorMessage> vendorMessage);
}