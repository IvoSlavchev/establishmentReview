package org.elsysbg.ip.review.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import org.elsysbg.ip.review.entities.Establishment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;

@XmlRootElement
@Entity
@NamedQueries({
	@NamedQuery(name = Person.QUERY_BY_USERNAME,
			query = "SELECT p FROM Person p WHERE p.username = :username")
})
public class Person {
	public static final String QUERY_BY_USERNAME = "personsByUsername";
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "PERSON_ID", nullable = false)
	private long id;
	
	@Column(nullable = false, unique = true)
	private String username;
	
	@Column(nullable = false)
	private String password;
	
	@Column(nullable = false)
	private String email;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private SecurityRole role = SecurityRole.PERSON;
	
	@JoinTable(joinColumns = {@JoinColumn(name = "person_id",
			referencedColumnName = "PERSON_ID", nullable = false)}, 
 		inverseJoinColumns = {@JoinColumn(name = "establishment_id",
 			referencedColumnName = "ESTABLISHMENT_ID", nullable = false)})
 	@ManyToMany(targetEntity = Establishment.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Establishment> favourites;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@XmlTransient
	@JsonIgnore
	public String getPassword() {
		return password;
	}

	@XmlElement
	@JsonInclude
	@JsonSetter
	public void setPassword(String password) {
		this.password = password;
	}
	
	@XmlTransient
	@JsonIgnore
	public String getEmail() {
		return email;
	}

	@XmlElement
	@JsonInclude
	@JsonSetter
	public void setEmail(String email) {
		this.email = email;
	}
	
	public List<Establishment> getFavourites() {
		return favourites;
	}
	
	public void setFavourites(List<Establishment> favourites) {
		this.favourites = favourites;
	}
}