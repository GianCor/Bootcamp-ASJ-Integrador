package com.abmApi.abmApi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abmApi.abmApi.entities.BridgeStats;
import com.abmApi.abmApi.entities.EntityStats;
import com.abmApi.abmApi.entities.OrderStats;
import com.abmApi.abmApi.repositories.CategoryRepository;
import com.abmApi.abmApi.repositories.FieldRepository;
import com.abmApi.abmApi.repositories.OrderRepository;
import com.abmApi.abmApi.repositories.ProductRepository;
import com.abmApi.abmApi.repositories.SupplierRepository;
import com.abmApi.abmApi.repositories.TaxRepository;

@Service
public class BridgeService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private TaxRepository taxRepository;

    @Autowired
    private FieldRepository fieldRepository;

    public BridgeStats getBridgeStats() {
        BridgeStats stats = new BridgeStats();

        long totalCategories = categoryRepository.count();
        long categoriesDeleted = categoryRepository.countByDeletedTrue();
        long categoriesActive = totalCategories - categoriesDeleted;

        stats.setCategories(new EntityStats(totalCategories, categoriesDeleted, categoriesActive));

        long totalOrders = orderRepository.count();
        long ordersCanceled = orderRepository.countByCanceledTrue();
        long ordersPending = orderRepository.countByPendingTrue();
        long ordersCompleted = totalOrders - ordersCanceled - ordersPending;

        stats.setOrders(new OrderStats(totalOrders, ordersCanceled, ordersPending, ordersCompleted));

        long totalProducts = productRepository.count();
        long productsDeleted = productRepository.countByDeletedTrue();
        long productsActive = totalProducts - productsDeleted;

        stats.setProducts(new EntityStats(totalProducts, productsDeleted, productsActive));

        long totalSuppliers = supplierRepository.count();
        long suppliersDeleted = supplierRepository.countByDeletedTrue();
        long suppliersActive = totalSuppliers - suppliersDeleted;

        stats.setSuppliers(new EntityStats(totalSuppliers, suppliersDeleted, suppliersActive));

        long totalTaxes = taxRepository.count();
        long taxesDeleted = taxRepository.countByDeletedTrue();
        long taxesActive = totalTaxes - taxesDeleted;

        stats.setTaxes(new EntityStats(totalTaxes, taxesDeleted, taxesActive));

        long totalFields = fieldRepository.count();
        long fieldsDeleted = fieldRepository.countByDeletedTrue();
        long fieldsActive = totalFields - fieldsDeleted;

        stats.setFields(new EntityStats(totalFields, fieldsDeleted, fieldsActive));

        return stats;
    }
}
