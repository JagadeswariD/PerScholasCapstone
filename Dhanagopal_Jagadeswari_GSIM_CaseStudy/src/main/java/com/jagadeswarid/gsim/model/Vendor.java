package com.jagadeswarid.gsim.model;

import java.io.Serializable;
import java.time.Instant;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
@Entity
@Table(name = "vendors", uniqueConstraints = { @UniqueConstraint(columnNames = "v_email") })
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Vendor implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotEmpty
	@Size(max = 20)
	@Column(name = "v_first_name")
	private String vendorFirstName;

	@NotEmpty
	@Size(max = 20)
	@Column(name = "v_last_name")
	private String vendorLastName;

	@NotEmpty
	@Size(max = 250)
	@Email
	@Column(name = "v_email")
	private String vendorEmail;

	@Column(name = "v_status")
	@ColumnDefault(value = "true")
	private boolean vendorStatus;

	@Column(name="v_creation_date", nullable = false)
	private Instant creationDate;
	
	@Column(name="v_modified_date",  nullable = false)
	private Instant modifiedDate;
}
