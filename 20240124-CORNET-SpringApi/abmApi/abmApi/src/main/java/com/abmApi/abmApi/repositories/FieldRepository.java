package com.abmApi.abmApi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.abmApi.abmApi.entities.Field;

@Repository
public interface FieldRepository extends JpaRepository<Field, Integer> {
    @Query("SELECT f FROM Field f WHERE f.deleted = false")
    List<Field> findActiveFields();
}