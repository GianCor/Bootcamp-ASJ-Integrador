package com.abmApi.abmApi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abmApi.abmApi.entities.Tax;

@Repository
public interface TaxRepository extends JpaRepository<Tax, Integer> {
}