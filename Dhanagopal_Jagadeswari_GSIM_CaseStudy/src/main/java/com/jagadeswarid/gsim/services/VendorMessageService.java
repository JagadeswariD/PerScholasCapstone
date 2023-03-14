package com.jagadeswarid.gsim.services;

import java.util.List;

import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import com.jagadeswarid.gsim.dto.VendorMessageDTO;
import gsim.gsim_producing_ws.GetAcknowledgementResponse;
import gsim.gsim_producing_ws.GetVendorMessageRequest;

public interface VendorMessageService {

	public GetAcknowledgementResponse getVendorMessage(@RequestPayload GetVendorMessageRequest request);

	public List<VendorMessageDTO> getAllVendorMessage();

	public VendorMessageDTO updateVendorMessage(Long id, VendorMessageDTO vendorMessageDto);

	public VendorMessageDTO getVendorMessageByID(Long id);

	public VendorMessageDTO approveVendorMessage(Long id);

	public VendorMessageDTO declineVendorMessage(Long id);

	public VendorMessageDTO pendingVendorMessage(Long id);

}
