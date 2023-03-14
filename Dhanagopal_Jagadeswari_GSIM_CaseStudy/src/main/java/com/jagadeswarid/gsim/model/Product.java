package com.jagadeswarid.gsim.model;

import java.io.Serializable;
import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products", uniqueConstraints = { 
	      @UniqueConstraint(columnNames = "p_name")
	    })
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "p_id")
	private Long id;

	@NotEmpty
	@Size(max = 20)
	@Column(name = "p_name")
	private String productName;
	
	@Size(max = 250)
	@Column(name = "p_description")
	private String productDescription;
	
	@Column(name="p_creation_date", nullable = false)
	private Instant creationDate;
	
	@Column(name="p_modified_date",  nullable = false)
	private Instant modifiedDate;
	
	

	
}
