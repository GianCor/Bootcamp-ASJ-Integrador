package com.abmApi.abmApi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abmApi.abmApi.entities.Country;

@Repository
public interface CountryRepository extends JpaRepository<Country, Integer> {
}