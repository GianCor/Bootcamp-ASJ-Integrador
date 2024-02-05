package com.abmApi.abmApi.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;


@Entity
@Table(name = "Order_Products")
public class OrderProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @Column(nullable = false)
    @NotNull(message = "[amount] no puede ser nulo.")
    private Integer amount;
    
    @Column(nullable = false)
    @NotNull(message = "[productName] no puede ser nulo.")
    private String productName;
    
    @Column(nullable = false)
    @NotNull(message = "[price] no puede ser nulo.")
    private Double price;

    @Column(nullable = false)
    @NotNull(message = "[subtotal] no puede ser nulo.")
    private Double subtotal;
    
    @PrePersist
    @PreUpdate
    private void calculateSubtotal() {
        if (amount != null && price != null) {
            this.subtotal = amount * price;
        } else {
            this.subtotal = 0.0;
        }
    }

	public OrderProduct(Integer id, Order order, Product product,
			@NotNull(message = "[amount] no puede ser nulo.") Integer amount,
			@NotNull(message = "[price] no puede ser nulo.") Double price,
			@NotNull(message = "[subtotal] no puede ser nulo.") Double subtotal,
			String productName){
		super();
		this.id = id;
		this.order = order;
		this.product = product;
		this.productName = productName;
		this.amount = amount;
		this.price = price;
		this.subtotal = subtotal;
	}

	public OrderProduct() {
		super();
	}
	
	
	
	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Product getProduct() {
		return product;
	}

    public void setProduct(Product product) {
        this.product = product;
        if (product != null) {
            this.price = product.getPrice();
            this.productName = product.getName();
        }
    }

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

    public Double getSubtotal() {
        calculateSubtotal(); // Asegura que subtotal esté calculado antes de acceder
        return subtotal;
    }

	public void setSubtotal(Double subtotal) {
		this.subtotal = subtotal;
	}
}