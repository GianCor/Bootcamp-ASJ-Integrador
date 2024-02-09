package com.abmApi.abmApi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.abmApi.abmApi.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    long countByDeletedFalse();
    long countByDeletedTrue();
    @Query("SELECT c FROM Category c WHERE c.deleted = false")
    List<Category> findActiveCategories();
}