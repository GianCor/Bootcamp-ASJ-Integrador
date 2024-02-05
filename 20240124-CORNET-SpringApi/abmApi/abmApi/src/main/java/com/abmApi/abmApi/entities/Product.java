package com.abmApi.abmApi.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
@Table(name = "Products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    @NotNull(message = "[sku] no puede ser nulo.")
    private String sku;
    
    @Column
    @Nullable
    private Integer supplier_id;

    @Column(nullable = false)
    @NotNull(message = "[supplierName] no puede ser nulo.")
    @NotBlank(message = "[supplierName] no puede estar vacio.")
    private String supplierName;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @Column(nullable = false)
    @NotNull(message = "[name] no puede ser nulo.")
    @NotBlank(message = "[name] no puede estar vacio.")
    private String name;

    @Column(nullable = true)
    private String description;

    @Column(nullable = false)
    @NotNull(message = "[price] no puede ser nulo.")
    private Double price;

    @Column
    private Boolean deleted;
    
    @Column 
    private String url;
    
	public Product() {
	}
	
    public Product(Integer id) {
        this.id = id;
    }

	public Product(Integer id, @NotNull(message = "[sku] no puede ser nulo.") String sku, Integer supplier_id,
			@NotNull(message = "[supplierName] no puede ser nulo.") @NotBlank(message = "[supplierName] no puede estar vacio.") String supplierName,
			Category category,
			@NotNull(message = "[name] no puede ser nulo.") @NotBlank(message = "[name] no puede estar vacio.") String name,
			String description, @NotNull(message = "[price] no puede ser nulo.") Double price, Boolean deleted,
			String url) {
		super();
		this.id = id;
		this.sku = sku;
		this.supplier_id = supplier_id;
		this.supplierName = supplierName;
		this.category = category;
		this.name = name;
		this.description = description;
		this.price = price;
		this.deleted = deleted;
		this.url = url;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public Integer getSupplier_id() {
		return supplier_id;
	}

	public void setSupplier_id(Integer supplier_id) {
		this.supplier_id = supplier_id;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}