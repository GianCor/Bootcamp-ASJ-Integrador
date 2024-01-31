package com.abmApi.abmApi.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abmApi.abmApi.entities.Order;
import com.abmApi.abmApi.repositories.OrderRepository;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Integer id) {
        return orderRepository.findById(id);
    }

    public Order postOrder(Order order) {
        orderRepository.save(order);
        return order;
    }

    public Optional<Order> deleteOrder(Integer id) {
        Optional<Order> order = orderRepository.findById(id);
        orderRepository.deleteById(id);
        return order;
    }

    public String putOrder(Integer id, Order updatedOrder) {
        Optional<Order> optionalExistingOrder = orderRepository.findById(id);

        if (optionalExistingOrder.isPresent()) {
            Order existingOrder = optionalExistingOrder.get();

            existingOrder.setProvider(updatedOrder.getProvider());
            existingOrder.setEmDate(updatedOrder.getEmDate());
            existingOrder.setReDate(updatedOrder.getReDate());
            existingOrder.setDescription(updatedOrder.getDescription());
            existingOrder.setPending(updatedOrder.getPending());
            existingOrder.setCompleted(updatedOrder.getCompleted());
            existingOrder.setCanceled(updatedOrder.getCanceled());
            existingOrder.setTotal(updatedOrder.getTotal());

            orderRepository.save(existingOrder);

            return "Order with ID " + id + " updated successfully.";
        } else {
            return "Order with ID " + id + " not found.";
        }
    }
}
