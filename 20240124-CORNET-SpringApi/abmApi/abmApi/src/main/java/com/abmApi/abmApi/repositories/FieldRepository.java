package com.abmApi.abmApi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abmApi.abmApi.entities.Field;

@Repository
public interface FieldRepository extends JpaRepository<Field, Integer> {
}