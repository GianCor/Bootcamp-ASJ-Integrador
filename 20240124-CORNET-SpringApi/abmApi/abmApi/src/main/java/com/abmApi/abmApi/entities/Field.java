package com.abmApi.abmApi.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="fields")
public class Field {
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private Integer id;
	
	@Column
	private String name;
	
	@Column
	private Boolean deleted;

	public Field(Integer id, String name, Boolean deleted) {
		super();
		this.id = id;
		this.name = name;
		this.deleted = deleted;
	}

	public Field() {
		super();
	}
	
	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
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
