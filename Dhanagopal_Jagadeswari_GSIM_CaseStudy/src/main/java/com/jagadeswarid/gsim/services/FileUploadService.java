package com.jagadeswarid.gsim.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.jagadeswarid.gsim.model.ImageFileDetail;

public interface FileUploadService {
	public void save(MultipartFile file);

	public boolean delete(String filepath);

	public List<ImageFileDetail> loadAll();

	public boolean getFileByID(Long id);

	public boolean deleteFile(Long id);
}
