package com.abmApi.abmApi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.abmApi.abmApi.entities.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Integer>{
    @Query("SELECT s FROM Supplier s WHERE s.deleted = false")
    List<Supplier> findActiveSuppliers();
    long countByDeletedFalse();
    long countByDeletedTrue();
}
