package com.jagadeswarid.gsim.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jagadeswarid.gsim.model.ImageFileDetail;
import com.jagadeswarid.gsim.repository.ImageFileDetailRepository;

@ExtendWith(MockitoExtension.class)
public class FileUploadServiceTest {
	@Mock
	private ImageFileDetailRepository imageFileDetailRepository;
	
	@InjectMocks
	private FileUploadService fileUploadService;
	
	private ImageFileDetail imageFileDetail;
	
	@BeforeEach
    public void setup(){
		imageFileDetail = new ImageFileDetail(1L, "Soda.png", "C:\\Users\\djesw\\Desktop\\Beverages", Instant.now());
                
    }
	 // JUnit test for getAllCategories method 
		@DisplayName("JUnit test for getAllCategories method")
		@Test
		public void givenCategoryList_whenGetAllCategories_thenReturnCategoryDTOList() {
			
			// precondition or setup
			
			ImageFileDetail imageFileDetail2 = new ImageFileDetail(1L, "Soda.png", "C:\\Users\\djesw\\Desktop\\Beverages", Instant.now());
			
			List<ImageFileDetail> imageFileDetailList = new ArrayList<>();
			imageFileDetailList.add(imageFileDetail);
			imageFileDetailList.add(imageFileDetail2);
			
				
			//given
			when(imageFileDetailRepository.findAll()).thenReturn(List.of(imageFileDetail2,imageFileDetail));
						
	        // when -  action or the behavior that we are going test
	        List<ImageFileDetail> imageFileListResult = fileUploadService.loadAll();
	        
	        // then - verify the output
	        assertThat(imageFileListResult).isNotNull();
	        assertThat(imageFileListResult.size()).isEqualTo(2);
		}
		
	
}
