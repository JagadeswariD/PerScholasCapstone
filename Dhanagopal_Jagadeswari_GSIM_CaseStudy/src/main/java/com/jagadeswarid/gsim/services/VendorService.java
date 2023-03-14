package com.jagadeswarid.gsim.services;

import java.util.List;

import com.jagadeswarid.gsim.dto.VendorDTO;

public interface VendorService {
	public List<VendorDTO> getAllVendors();

	public VendorDTO createVendor(VendorDTO vendorDto);

	public VendorDTO getVendorByID(Long id);

	public boolean getVendorByEmail(String vendorEmail);

	public VendorDTO getVendorByEmailReturnDTO(String vendorEmail);

	public VendorDTO updateVendor(Long id, VendorDTO vendorDto);

	public void deleteVendor(Long id);
}
