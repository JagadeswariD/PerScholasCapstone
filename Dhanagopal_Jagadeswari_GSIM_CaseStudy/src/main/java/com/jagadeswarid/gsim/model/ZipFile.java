package com.jagadeswarid.gsim.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "zipfile")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ZipFile {

	public ZipFile(String zipFileName, String url) {
		this.zipFileName = zipFileName;
		this.zipFilePath = url;
		this.creationDate = Instant.now();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "zf_id")
	private Long id;
	
	@NotNull
	@Column(name = "zf_zip_file_name", nullable = false)
	private String zipFileName;
	
	@NotNull
	@Column(name = "zf_zip_file_path", nullable = false)
	private String zipFilePath;
	
	@Column(name = "zfd_creation_date", nullable = false)
	private Instant creationDate;
}
