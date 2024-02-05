package com.abmApi.abmApi.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abmApi.abmApi.entities.Order;
import com.abmApi.abmApi.entities.OrderProduct;
import com.abmApi.abmApi.excpetion.OrderNotFoundException;
import com.abmApi.abmApi.repositories.OrderProductRepository;
import com.abmApi.abmApi.repositories.OrderRepository;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderProductRepository orderProductRepository;

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Integer id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(Order order) {
        if (order.getOrderProducts() != null && !order.getOrderProducts().isEmpty()) {
            for (OrderProduct orderProduct : order.getOrderProducts()) {
                orderProduct.setOrder(order);
            }

            order.calculateTotal();

            return orderRepository.save(order);
        }

        return orderRepository.save(order);
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
    
    public List<OrderProduct> getOrderProductsByOrderId(Integer orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            return orderProductRepository.findByOrder(order);
        } else {
            throw new OrderNotFoundException("Orden no encontrada con ID: " + orderId);
        }
    }

}
