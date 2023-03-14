package com.jagadeswarid.gsim.services;
import java.time.Instant;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import com.jagadeswarid.gsim.dto.VendorMessageDTO;
import com.jagadeswarid.gsim.exception.ResourceNotFoundException;
import com.jagadeswarid.gsim.mapper.VendorMessageMapper;
import com.jagadeswarid.gsim.model.ProductDetail;
import com.jagadeswarid.gsim.model.VendorMessage;
import com.jagadeswarid.gsim.repository.ProductDetailRepository;
import com.jagadeswarid.gsim.repository.VendorMessageRepository;

import gsim.gsim_producing_ws.AckStatus;
import gsim.gsim_producing_ws.GetAcknowledgementResponse;
import gsim.gsim_producing_ws.GetVendorMessageRequest;

@Endpoint
public class VendorMessageServiceImpl implements VendorMessageService{
	private static final String NAMESPACE_URI = "http://www.gsim/gsim-producing-ws";
	Logger logger = LoggerFactory.getLogger(VendorMessageServiceImpl.class);

	@Autowired
	VendorMessageRepository repository;
	
	@Autowired
	ProductDetailRepository productDetailRepository;
	
	@Autowired
	private VendorMessageMapper mapper;
	
	//Method to get Vendor Message 
	@PayloadRoot(namespace = NAMESPACE_URI, localPart = "getVendorMessageRequest")
	@ResponsePayload
	public GetAcknowledgementResponse getVendorMessage(@RequestPayload GetVendorMessageRequest request) {
		logger.info("Vendor message received : " +request.getVendormessge());
		VendorMessage vendorMessage = new VendorMessage(request.getVendormessge().getProductName(),
				request.getVendormessge().getVendorName(), request.getVendormessge().getVendorEmail(),
				request.getVendormessge().getStockCount(), request.getVendormessge().getPricePerBox(),
				request.getVendormessge().getStockPrice(), request.getVendormessge().getCurrency(),
				AckStatus.ACK,request.getVendormessge().getTax(), request.getVendormessge().getFinalAmount());
		repository.save(vendorMessage);
		GetAcknowledgementResponse response = new GetAcknowledgementResponse();
		response.setAckStatus(AckStatus.ACK);
		return response;
	}

	//Returns all the vendors
	public List<VendorMessageDTO> getAllVendorMessage() {
		logger.info("getAllVendorMessage is called");
		return mapper.toVendorMessageDtoList(repository.findAll());
		
	}

	
	// Updates Vendor Message
	@Transactional
	public VendorMessageDTO updateVendorMessage(Long id, VendorMessageDTO vendorMessageDto) {
		logger.info("Vendor Message to be updated : "+ id);
		VendorMessage vendorMessage = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("VendorMessage does not exist with id :" + id));
		vendorMessage.setStatus(AckStatus.APPROVED);
		vendorMessage.setModifiedDate(Instant.now());
		ProductDetail productDetail = productDetailRepository.findByProductProductNameAndVendorVendorEmail(vendorMessage.getProductName(),vendorMessage.getVendorEmail());
		productDetail.setProductStockCount(productDetail.getProductStockCount()+vendorMessage.getStockCount());
		productDetailRepository.save(productDetail);
		return mapper.toVendorMessageDto(repository.save(vendorMessage));
		
	}
	
	//Returns a vendor Message by id
	public VendorMessageDTO getVendorMessageByID(Long id) {
		logger.info("Vendor to be getVendorMessageByID:" +id);
		VendorMessage vendorMessage = repository.findById(id).get();
		return mapper.toVendorMessageDto(vendorMessage);
	}

	
	// Approve Vendor Message
	@Transactional
	public VendorMessageDTO approveVendorMessage(Long id) {
		logger.info("Vendor Message to be approved : "+ id);
		VendorMessage vendorMessage = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("VendorMessage does not exist with id :" + id));
		vendorMessage.setStatus(AckStatus.APPROVED);
		vendorMessage.setModifiedDate(Instant.now());
		return mapper.toVendorMessageDto(repository.save(vendorMessage));
		
	}
	
	// Decline Vendor Message
	@Transactional
	public VendorMessageDTO declineVendorMessage(Long id) {
		logger.info("Vendor Message to be declined : "+ id);
		VendorMessage vendorMessage = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("VendorMessage does not exist with id :" + id));
		vendorMessage.setStatus(AckStatus.DECLINED);
		vendorMessage.setModifiedDate(Instant.now());
		return mapper.toVendorMessageDto(repository.save(vendorMessage));
		
	}
	
	// Decline Vendor Message
	@Transactional
	public VendorMessageDTO pendingVendorMessage(Long id) {
		logger.info("Vendor Message to be changed to Pending : "+ id);
		VendorMessage vendorMessage = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("VendorMessage does not exist with id :" + id));
		vendorMessage.setStatus(AckStatus.PENDING);
		vendorMessage.setModifiedDate(Instant.now());
		return mapper.toVendorMessageDto(repository.save(vendorMessage));
		
	}

}
