package com.abmApi.abmApi.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="contacts")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @NotNull(message = "El nombre de contacto no puede ser nulo.")
    @Column(name = "contact_name")
    private String contactName;

    @NotNull(message = "El apellido de contacto no puede ser nulo.")
    @Column(name = "contact_last_name")
    private String contactLastName;

    @NotNull(message = "El email de contacto no puede ser nulo.")
    @Column(name = "contact_email")
    private String contactEmail;

    @NotNull(message = "El teléfono de contacto no puede ser nulo.")
    @Column(name = "contact_phone")
    private String contactPhone;

    @NotNull(message = "El rol de contacto no puede ser nulo.")
    @Column(name = "contact_role")
    private String contactRole;
	public Contact(Integer id, String contactName, String contactLastName, String contactEmail, String contactPhone,
			String contactRole) {
		super();
		this.id = id;
		this.contactName = contactName;
		this.contactLastName = contactLastName;
		this.contactEmail = contactEmail;
		this.contactPhone = contactPhone;
		this.contactRole = contactRole;
	}
	
	public String getContactRole() {
		return contactRole;
	}

	public void setContactRole(String contactRole) {
		this.contactRole = contactRole;
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getContactName() {
		return contactName;
	}
	public void setContactName(String contactName) {
		this.contactName = contactName;
	}
	public String getContactLastName() {
		return contactLastName;
	}
	public void setContactLastName(String contactLastName) {
		this.contactLastName = contactLastName;
	}
	public String getContactEmail() {
		return contactEmail;
	}
	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}
	public String getContactPhone() {
		return contactPhone;
	}
	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}
	public Contact() {
		super();
	}
    

}