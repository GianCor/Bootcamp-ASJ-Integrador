package com.abmApi.abmApi.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="taxes")
public class Tax {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String name;
    
    private Boolean deleted;

	public Tax(Integer id, String name, Boolean deleted) {
		super();
		this.id = id;
		this.name = name;
		this.deleted = deleted;
	}

	public Tax() {
		super();
	}
	
	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		if(deleted) {
			this.deleted = deleted;
		} else {
			this.deleted = false;
		}
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
    
}
