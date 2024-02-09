package com.abmApi.abmApi.entities;

public class BridgeStats {
    private EntityStats categories;
    private OrderStats orders;
    private EntityStats products;
    private EntityStats suppliers;
    private EntityStats taxes;
    private EntityStats fields;

    // Constructor
    public BridgeStats() {
    }

    // Getters y setters
    public EntityStats getCategories() {
        return categories;
    }

    public void setCategories(EntityStats categories) {
        this.categories = categories;
    }

    public OrderStats getOrders() {
        return orders;
    }

    public void setOrders(OrderStats orders) {
        this.orders = orders;
    }

    public EntityStats getProducts() {
        return products;
    }

    public void setProducts(EntityStats products) {
        this.products = products;
    }

    public EntityStats getSuppliers() {
        return suppliers;
    }

    public void setSuppliers(EntityStats suppliers) {
        this.suppliers = suppliers;
    }

    public EntityStats getTaxes() {
        return taxes;
    }

    public void setTaxes(EntityStats taxes) {
        this.taxes = taxes;
    }

    public EntityStats getFields() {
        return fields;
    }

    public void setFields(EntityStats fields) {
        this.fields = fields;
    }
}
