package com.jagadeswarid.gsim.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jagadeswarid.gsim.model.ERole;
import com.jagadeswarid.gsim.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{
	Optional<Role> findByName(ERole name);
	Optional<Role> findByName (String name);
}
