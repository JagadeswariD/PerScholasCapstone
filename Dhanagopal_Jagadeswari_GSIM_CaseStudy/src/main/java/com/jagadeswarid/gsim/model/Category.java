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
@Table(name = "categories", uniqueConstraints = { 
	      @UniqueConstraint(columnNames = "c_name")
	    })
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "c_id")
	private Long id;

	@NotEmpty
	@Size(max = 20)
	@Column(name = "c_name")
	private String categoryName;
	
	@Size(max = 250)
	@Column(name = "c_description")
	private String categoryDescription;

	@Column(name="c_creation_date", nullable = false)
	private Instant creationDate;
	
	@Column(name="c_modified_date",  nullable = false)
	private Instant modifiedDate;

	public Category(@NotEmpty @Size(max = 20) String categoryName, @Size(max = 250) String categoryDescription,
			Instant creationDate, Instant modifiedDate) {
		super();
		this.categoryName = categoryName;
		this.categoryDescription = categoryDescription;
		this.creationDate = creationDate;
		this.modifiedDate = modifiedDate;
	}
	
	
}
