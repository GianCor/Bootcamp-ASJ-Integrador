package com.abmApi.abmApi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.abmApi.abmApi.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{
	@Query("SELECT p FROM Product p WHERE p.deleted = false")
	List<Product> findActiveProducts();
}
