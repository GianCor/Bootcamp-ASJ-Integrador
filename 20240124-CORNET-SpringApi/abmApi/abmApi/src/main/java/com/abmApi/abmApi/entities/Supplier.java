package com.abmApi.abmApi.entities;
import java.time.LocalDate;
import java.util.List;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="suppliers")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column
    @NotNull(message = "[supplierCode] no puede ser nulo.")
    @Size(min = 4, message = "[supplierCode] debe tener como mínimo 4 caracteres.")
    private String supplierCode;

    @Column
    @NotNull(message = "[name] no puede ser nulo.")
    @Size(max = 60, message = "[name] puede tener como máximo 60 caracteres.")
    private String name;

    @ManyToOne
    @JoinColumn(name = "field_id", referencedColumnName = "id")
    private Field field;

    @Column
    @NotNull(message = "[phone] no puede ser nulo.")
    @Size(min = 10, max = 15, message = "[phone] debe tener entre 10 y 15 caracteres.")
    private String phone;

    @ManyToOne
    @JoinColumn(name = "tax_id", referencedColumnName = "id")
    private Tax tax;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @Column
    @NotNull(message = "[cuit] no puede ser nulo.")
    @Size(min = 11, max = 11, message = "[cuit] debe tener 11 caracteres.")
    private String cuit;

    @Column
    @NotNull(message = "[email] no puede ser nulo.")
    private String email;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contact_id", referencedColumnName = "id")
    private Contact contact;
    
    @Column
    private LocalDate updated_at;

    @Column
    private LocalDate created_at;

    @Column
    private String website;

    @Column
    private String url;
    
    @Nullable
    @OneToMany(mappedBy = "supplier_id", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products;

	public Supplier(Integer id,
			@NotNull(message = "[supplierCode] no puede ser nulo.") @Size(min = 4, message = "[supplierCode] debe tener como mínimo 4 caracteres.") String supplierCode,
			@NotNull(message = "[name] no puede ser nulo.") @Size(max = 60, message = "[name] puede tener como máximo 60 caracteres.") String name,
			Field field,
			@NotNull(message = "[phone] no puede ser nulo.") @Size(min = 10, max = 15, message = "[phone] debe tener entre 10 y 15 caracteres.") String phone, Tax tax, Address address,
			@NotNull(message = "[cuit] no puede ser nulo.") @Size(min = 11, max = 11, message = "[cuit] debe tener 11 caracteres.") String cuit,
			@NotNull(message = "[email] no puede ser nulo.") String email, Contact contact, LocalDate updated_at,
			LocalDate created_at, String website,
			String url, List<Product> products) {
		super();
		this.id = id;
		this.supplierCode = supplierCode;
		this.name = name;
		this.field = field;
		this.phone = phone;
		this.tax = tax;
		this.address = address;
		this.cuit = cuit;
		this.email = email;
		this.contact = contact;
		this.updated_at = updated_at;
		this.created_at = created_at;
		this.website = website;
		this.url = url;
		this.products = products;
	}

	public Supplier() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSupplierCode() {
		return supplierCode;
	}

	public void setSupplierCode(String supplierCode) {
		this.supplierCode = supplierCode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Field getField() {
		return field;
	}

	public void setField(Field field) {
		this.field = field;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Tax getTax() {
		return tax;
	}

	public void setTax(Tax tax) {
		this.tax = tax;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getCuit() {
		return cuit;
	}

	public void setCuit(String cuit) {
		this.cuit = cuit;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Contact getContact() {
		return contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}

	public LocalDate getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(LocalDate updated_at) {
		this.updated_at = updated_at;
	}

	public LocalDate getCreated_at() {
		return created_at;
	}

	public void setCreated_at(LocalDate created_at) {
		this.created_at = created_at;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}
    
}