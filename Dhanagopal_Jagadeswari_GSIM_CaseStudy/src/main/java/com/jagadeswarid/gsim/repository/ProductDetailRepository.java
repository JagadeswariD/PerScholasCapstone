package com.jagadeswarid.gsim.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jagadeswarid.gsim.model.Category;
import com.jagadeswarid.gsim.model.Product;
import com.jagadeswarid.gsim.model.ProductDetail;
import com.jagadeswarid.gsim.model.Vendor;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long>{

	boolean existsByProductAndCategoryAndVendor(Product product, Category category, Vendor vendor);

	ProductDetail findByProductProductNameAndVendorVendorEmail(String productName, String vendorEmail);

}
