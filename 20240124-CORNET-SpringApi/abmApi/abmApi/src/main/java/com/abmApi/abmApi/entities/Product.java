package com.abmApi.abmApi.entities;
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

@Entity
@Table(name = "Products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

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
    @NotBlank(message = "[price] no puede estar vacio.")
    private String price;

    @Column(nullable = true)
    private Integer amount;

    @Column(nullable = true)
    private Double subtotal;

    @Column(nullable = true)
    private Boolean checked;

    
    
	public Product() {
	}

	public Product(Integer id, Integer supplier_id, String supplierName, Category category, String name,
			String description, String price, Integer amount, Double subtotal, Boolean checked) {
		this.id = id;
		this.supplier_id = supplier_id;
		this.supplierName = supplierName;
		this.category = category;
		this.name = name;
		this.description = description;
		this.price = price;
		this.amount = amount;
		this.subtotal = subtotal;
		this.checked = checked;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public Double getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(Double subtotal) {
		this.subtotal = subtotal;
	}

	public Boolean getChecked() {
		return checked;
	}

	public void setChecked(Boolean checked) {
		this.checked = checked;
	}
    
    
}