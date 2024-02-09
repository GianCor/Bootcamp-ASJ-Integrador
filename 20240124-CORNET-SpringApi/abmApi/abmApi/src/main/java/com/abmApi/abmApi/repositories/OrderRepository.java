package com.abmApi.abmApi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abmApi.abmApi.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Integer>{
    long countByPendingTrue();
    long countByCanceledTrue();
    long countByCompletedTrue();
}
