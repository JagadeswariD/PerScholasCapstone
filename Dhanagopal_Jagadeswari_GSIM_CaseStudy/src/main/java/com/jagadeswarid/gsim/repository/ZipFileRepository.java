package com.jagadeswarid.gsim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jagadeswarid.gsim.model.ZipFile;


@Repository
public interface ZipFileRepository extends JpaRepository<ZipFile, Long> {

}
