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
@Table(name = "imagefile_detail")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageFileDetail {
	public ImageFileDetail(String filePath, String fileName) {
		this.filePath = filePath;
		this.fileName = fileName;
		this.creationDate = Instant.now();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ifd_id")
	private Long id;
	
	@NotNull
	@Column(name = "ifd_file_path", nullable = false)
	private String	filePath;
	
	@NotNull
	@Column(name = "ifd_file_name", nullable = false)
	private String fileName;
	
	@Column(name = "ifd_creation_date", nullable = false)
	private Instant creationDate;
	
}
