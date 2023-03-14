package com.jagadeswarid.gsim.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.jagadeswarid.gsim.model.ImageFileDetail;
import com.jagadeswarid.gsim.repository.ImageFileDetailRepository;

import net.lingala.zip4j.ZipFile;
import net.lingala.zip4j.exception.ZipException;

@Service
public class ImageFileTrackerSchedulerService {
	
		@Value("${gsim.app.sourcedir}")
		private String sourceDir;
		
		@Value("${gsim.app.destinationdir}")
		private String destinationDir;
		
		@Autowired
		private ImageFileDetailRepository repository;
		
		Logger logger = LoggerFactory.getLogger(ImageFileTrackerSchedulerService.class);

		//Method the move the file to destination Dir and extract the file, gets executed based on cron expression provided
		@Scheduled(cron = "${gsim.app.cronExpression}")
		public void processImage() throws IOException {
		
			List<File> zipFileNames = null;
			try {
				zipFileNames = Files.list(Paths.get(sourceDir))
				        .filter(path -> path.toFile().isFile() && path.toString().endsWith(".zip"))
				        .map(Path::toFile)
				        .collect(Collectors.toList());
			} catch (IOException e1) {
				logger.info(e1.getMessage());
				e1.printStackTrace();
			}
		
			for (File path : zipFileNames) {
				logger.info("File to be processed : "+path);
				
				try (ZipFile zipFile = new ZipFile(path)) {
					String fileName=path.getName();
					zipFile.extractAll(destinationDir);
					String tempPath = destinationDir+"\\"+fileName.substring(0,fileName.length()-4);
					List<File> filepaths = Files.list(Paths.get(tempPath))
			                .filter(path1 -> path1.toFile().isFile() && path1.toString().endsWith(".png"))
			                .map(Path::toFile)
			                .collect(Collectors.toList());
			
					for (File filepath : filepaths) {
						System.out.println(filepath);
						ImageFileDetail imageFile = new ImageFileDetail(filepath.toString(), filepath.getName());
						repository.save(imageFile);
						logger.info("Image record saved in repository");
					}
					logger.info("Unzipped file successfully: "+ fileName);
					
				} catch (ZipException e) {
					logger.error(e.getMessage());
					e.printStackTrace();
				} finally {
					
					 boolean success =path.delete();
					 logger.info("On successful extraction original file deleted : "+success);
				}
			}
		}
}
