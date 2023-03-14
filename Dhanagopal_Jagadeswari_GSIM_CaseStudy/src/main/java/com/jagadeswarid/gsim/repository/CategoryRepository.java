package com.jagadeswarid.gsim.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jagadeswarid.gsim.model.Category;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
	Optional<Category> findByCategoryName(String username);
	Boolean existsByCategoryName(String username);
	
}
