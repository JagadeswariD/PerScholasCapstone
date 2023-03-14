package com.jagadeswarid.gsim.model;

import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Table(name = "users", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "username"),
      @UniqueConstraint(columnNames = "u_email") 
    })
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 20)
  private String username;

  @Column(name="u_fname", nullable = false)
	private String userFirstName;
	@Column(name="u_lname", nullable = false)
	private String userLastName;
	@Column(name="u_email", nullable = false)
	private String email;
	@Column(name="u_password", nullable = false)
	private String password;
	@Column(name = "u_status")
	@ColumnDefault(value = "true")
	boolean userStatus;


  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(  name = "user_roles", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> role = new HashSet<>();
  
  public User(String username, String email, String password) {
	    this.username = username;
	    this.email = email;
	    this.password = password;
	  }

public User(long id, String userFirstName, String userLastName,String username, String email, String password, boolean userStatus) {
	// TODO Auto-generated constructor stub
	 	this.username = username;
	    this.email = email;
	    this.password = password;
	    this.userFirstName = userFirstName;
	    this.userLastName = userLastName;
	    this.password = password;
	    this.setUserStatus(userStatus);
}
}
