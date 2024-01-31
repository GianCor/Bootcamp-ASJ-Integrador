package com.abmApi.abmApi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abmApi.abmApi.entities.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> {
}
