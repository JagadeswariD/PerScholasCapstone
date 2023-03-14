package com.jagadeswarid.gsim.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.jagadeswarid.gsim.exception.ResourceNotFoundException;
import com.jagadeswarid.gsim.model.ImageFileDetail;
import com.jagadeswarid.gsim.response.MessageResponse;
import com.jagadeswarid.gsim.services.FileUploadService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/upload")
public class FileUploadController {
	@Autowired
	  FileUploadService service;

	  Logger logger = LoggerFactory.getLogger(FileUploadController.class);
	
	  //Method to upload Image file
	  @PostMapping("/")
	  public ResponseEntity<MessageResponse> uploadFile(@RequestParam("file") MultipartFile file) {
	    String message = "";
	    try {
	    	service.save(file);

	      message = "Uploaded the file successfully: " + file.getOriginalFilename();
	      return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
	    } catch (Exception e) {
	      message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage();
	      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
	    }
	  }

	 //Returns list of files
	  @GetMapping("/")
	  public ResponseEntity<List<ImageFileDetail>> getListFiles() {
	    return ResponseEntity.ok(service.loadAll());
	  }

	 
	// delete image file
	  @DeleteMapping("/{id}")
	  public ResponseEntity<?> deleteProduct(@PathVariable Long id){
			if(!service.getFileByID(id)) {
				new ResourceNotFoundException("File does not exist with id :" + id);
				return ResponseEntity.badRequest().body(new MessageResponse("Error: File does not exist with id :" + id));
			}
			if(service.deleteFile(id)) {
				Map<String, Boolean> response = new HashMap<>();
				response.put("deleted", Boolean.TRUE);
				return ResponseEntity.ok(response);
			}else {
				return ResponseEntity.badRequest().body(new MessageResponse("Error: Physical File does not exist with id :" + id));
			}				
			
		}
	 
}
