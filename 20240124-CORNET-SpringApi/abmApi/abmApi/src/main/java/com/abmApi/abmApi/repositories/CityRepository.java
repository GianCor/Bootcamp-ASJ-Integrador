package com.abmApi.abmApi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abmApi.abmApi.entities.City;
import com.abmApi.abmApi.entities.State;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {
	List<City> findByState(State state);
}