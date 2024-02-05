package com.abmApi.abmApi.entities;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

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
    @NotNull(message = "[orderNum] no puede ser nulo.")
    private String numOrder;
    
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
    private Boolean pending;

    @Column
    @NotNull(message = "[completed] no puede ser nulo.")
    private Boolean completed;

    @Column
    private Boolean canceled;

    @Column
    private Double total;

    
    @JsonManagedReference
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderProduct> orderProducts = new ArrayList<>();
    
    
    public void calculateTotal() {
        double orderTotal = 0.0;

        for (OrderProduct orderProduct : orderProducts) {
            orderTotal += orderProduct.getSubtotal();
        }

        this.total = orderTotal;
    }
    
	public Order() {
	}

	public Order(Integer id, @NotNull(message = "[orderNum] no puede ser nulo.") String numOrder,
			@NotNull(message = "[provider] no puede ser nulo.") @NotBlank(message = "[provider] no puede estar vacio.") String provider,
			@NotNull(message = "[emDate] no puede ser nulo.") Date emDate,
			@NotNull(message = "[reDate] no puede ser nulo.") Date reDate, String description,
			@NotNull(message = "[pending] no puede ser nulo.") Boolean pending,
			@NotNull(message = "[completed] no puede ser nulo.") Boolean completed, Boolean canceled, Double total,
			List<OrderProduct> orderProducts) {
		super();
		this.id = id;
		this.numOrder = numOrder;
		this.provider = provider;
		this.emDate = emDate;
		this.reDate = reDate;
		this.description = description;
		this.pending = pending;
		this.completed = completed;
		this.canceled = canceled;
		this.orderProducts = orderProducts;
		this.total = total;
	}

	public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public String getNumOrder() {
		return numOrder;
	}



	public void setNumOrder(String numOrder) {
		this.numOrder = numOrder;
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



	public Boolean getPending() {
		return pending;
	}



	public void setPending(Boolean pending) {
		this.pending = pending;
	}



	public Boolean getCompleted() {
		return completed;
	}



	public void setCompleted(Boolean completed) {
		this.completed = completed;
	}



	public Boolean getCanceled() {
		return canceled;
	}



	public void setCanceled(Boolean canceled) {
		this.canceled = canceled;
	}



	public Double getTotal() {
		return total;
	}



	public void setTotal(Double total) {
		this.total = total;
	}



	public List<OrderProduct> getOrderProducts() {
		return orderProducts;
	}



	public void setOrderProducts(List<OrderProduct> orderProducts) {
		this.orderProducts = orderProducts;
	}    
}
