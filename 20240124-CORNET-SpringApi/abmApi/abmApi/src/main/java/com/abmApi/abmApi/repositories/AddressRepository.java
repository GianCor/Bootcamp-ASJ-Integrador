package com.abmApi.abmApi.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abmApi.abmApi.entities.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
}