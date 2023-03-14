package com.jagadeswarid.gsim.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jagadeswarid.gsim.model.ImageFileDetail;

@Repository
public interface ImageFileDetailRepository extends JpaRepository<ImageFileDetail, Long> {
	  
}
