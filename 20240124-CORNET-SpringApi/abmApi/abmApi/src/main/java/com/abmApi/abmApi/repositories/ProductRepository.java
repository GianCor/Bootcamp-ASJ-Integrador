package com.abmApi.abmApi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abmApi.abmApi.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{
}
