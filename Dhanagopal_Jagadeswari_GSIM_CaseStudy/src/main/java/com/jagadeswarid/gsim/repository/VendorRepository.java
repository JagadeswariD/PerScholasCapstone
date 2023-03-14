package com.jagadeswarid.gsim.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jagadeswarid.gsim.model.Vendor;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long>{

	boolean existsByVendorEmail(String vendorEmail);

	Optional<Vendor> findByVendorEmail(String vendorEmail);

   
}
