package com.abmApi.abmApi.entities;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    @NotNull(message = "[provider] no puede ser nulo.")
    @NotBlank(message = "[provider] no puede estar vacio.")
    private String provider;

    @Column
    @NotNull(message = "[emDate] no puede ser nulo.")
    private Date emDate;

    @Column
    @NotNull(message = "[reDate] no puede ser nulo.")
    private Date reDate;

    @Column
    private String description;

    @Column
    @NotNull(message = "[pending] no puede ser nulo.")
    private String pending;

    @Column
    @NotNull(message = "[completed] no puede ser nulo.")
    private String completed;

    @Column
    private String canceled;

    @Column
    private String total;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private List<Product> products;

    
    
	public Order() {
	}

	public Order(Integer id, String provider, Date emDate, Date reDate, String description, String pending,
			String completed, String canceled, String total, List<Product> products) {
		this.id = id;
		this.provider = provider;
		this.emDate = emDate;
		this.reDate = reDate;
		this.description = description;
		this.pending = pending;
		this.completed = completed;
		this.canceled = canceled;
		this.total = total;
		this.products = products;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getProvider() {
		return provider;
	}

	public void setProvider(String provider) {
		this.provider = provider;
	}

	public Date getEmDate() {
		return emDate;
	}

	public void setEmDate(Date emDate) {
		this.emDate = emDate;
	}

	public Date getReDate() {
		return reDate;
	}

	public void setReDate(Date reDate) {
		this.reDate = reDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPending() {
		return pending;
	}

	public void setPending(String pending) {
		this.pending = pending;
	}

	public String getCompleted() {
		return completed;
	}

	public void setCompleted(String completed) {
		this.completed = completed;
	}

	public String getCanceled() {
		return canceled;
	}

	public void setCanceled(String canceled) {
		this.canceled = canceled;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}
    
    
}
