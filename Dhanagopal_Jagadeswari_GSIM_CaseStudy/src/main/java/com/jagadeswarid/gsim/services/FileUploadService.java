package com.jagadeswarid.gsim.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jagadeswarid.gsim.model.ImageFileDetail;
import com.jagadeswarid.gsim.model.ZipFile;
import com.jagadeswarid.gsim.repository.ImageFileDetailRepository;
import com.jagadeswarid.gsim.repository.ZipFileRepository;

@Service
public class FileUploadService {
	
	Logger logger = LoggerFactory.getLogger(FileUploadService.class);
	
	@Value("${gsim.app.sourcedir}")
	private String sourceDir;
	
	@Autowired
	ZipFileRepository repository;
	
	@Autowired
	ImageFileDetailRepository ifdRepository;
	
	private final Path root = Paths.get("C:\\Users\\djesw\\Desktop\\img");

	//initialize the source directory
	  public void init() {
	    try {
	      Files.createDirectories(root);
	    } catch (IOException e) {
	      throw new RuntimeException("Could not initialize folder for upload!");
	    }
	  }

	  //Saves the file to local directory on successful upload
	  public void save(MultipartFile file) {
	    try {
	      logger.info("File to be uploaded : "+ file.getName());
	      Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
	      ZipFile zipFile = new ZipFile(file.getOriginalFilename(), sourceDir);
	      repository.save(zipFile);
	    } catch (Exception e) {
	      logger.error(e.getMessage());
	      throw new RuntimeException(e.getMessage());
	    }
	  }
	  
	  //Method to delete the physical file
	  public boolean delete(String filepath) {
	    try {
	    	logger.info("File to be deleted : "+filepath);
	        return Files.deleteIfExists(Paths.get(filepath));
	    } catch (IOException e) {
	    	logger.error(e.getMessage());
	      throw new RuntimeException("Error: " + e.getMessage());
	      
	    }
	  }

	  //Returns list of image files
	  public List<ImageFileDetail> loadAll() {
	     return ifdRepository.findAll();
	  }

	 //Get Image file existence by id
	public boolean getFileByID(Long id) {
		
		return ifdRepository.findById(id).equals(null)? false : true ;
	}

	//Delete file method by id
	public boolean deleteFile(Long id) {
		logger.info("Image file to be deleted by id: "+id);
		ImageFileDetail imgFileDetail = ifdRepository.findById(id).get();
		if(delete(imgFileDetail.getFilePath()))
		{
			ifdRepository.delete(imgFileDetail);
			return true;
		}
		return false;
	}
}
