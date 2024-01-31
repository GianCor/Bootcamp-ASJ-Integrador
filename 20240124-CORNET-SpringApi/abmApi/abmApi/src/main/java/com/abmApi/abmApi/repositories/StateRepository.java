package com.abmApi.abmApi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abmApi.abmApi.entities.Country;
import com.abmApi.abmApi.entities.State;

@Repository
public interface StateRepository extends JpaRepository<State, Integer> {
	List<State> findByCountry(Country country);
}
