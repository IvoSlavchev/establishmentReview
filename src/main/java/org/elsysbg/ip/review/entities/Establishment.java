package org.elsysbg.ip.review.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;

@XmlRootElement
@Entity
@NamedQueries({
	@NamedQuery(name = Establishment.QUERY_BY_USERNAME,
		query = "SELECT e FROM Establishment e WHERE e.username = :username"),
	@NamedQuery(name = Establishment.QUERY_ALL,
		query = "SELECT e FROM Establishment e")
})
public class Establishment {
	public static final String QUERY_BY_USERNAME = "establishmentsByUsername";
	public static final String QUERY_ALL = "establishmentsAll";
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private long id;
	
	@Column(nullable = false, unique = true)
	private String username;
	
	@Column(nullable = false)
	private String password;
	
	@Column(nullable = false)
	private String email;
	
	@Column
	private String name;
	
	@Column
	private String telephone;
	
	@Column
	private String address;
	
	@Column
	private String type;
	
	@Column
	private String description;
	
	@Column
	private int reviewsCount;
	
	@Column
	private int allRatings;
	
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getReviewsCount() {
		return reviewsCount;
	}

	public void setReviewsCount(int reviewsCount) {
		this.reviewsCount = reviewsCount;
	}

	public int getAllRatings() {
		return allRatings;
	}

	public void setAllRatings(int allRatings) {
		this.allRatings = allRatings;
	}
}