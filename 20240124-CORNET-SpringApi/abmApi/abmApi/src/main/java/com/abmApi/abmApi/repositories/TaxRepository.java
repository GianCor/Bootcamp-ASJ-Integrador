package com.abmApi.abmApi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.abmApi.abmApi.entities.Tax;

@Repository
public interface TaxRepository extends JpaRepository<Tax, Integer> {
    @Query("SELECT t FROM Tax t WHERE t.deleted = false")
    List<Tax> findActiveTaxes();
    long countByDeletedFalse();
    long countByDeletedTrue();
}