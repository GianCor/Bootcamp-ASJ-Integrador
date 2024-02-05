package com.abmApi.abmApi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abmApi.abmApi.entities.Order;
import com.abmApi.abmApi.entities.OrderProduct;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Integer> {

    List<OrderProduct> findByOrder(Order order);
}