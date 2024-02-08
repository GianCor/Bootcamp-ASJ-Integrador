package com.abmApi.abmApi.controllers;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.abmApi.abmApi.entities.Product;
import com.abmApi.abmApi.services.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok(null);
    }

    @GetMapping
    public ResponseEntity<List<Product>> getProducts() {
        return ResponseEntity.ok(productService.getProducts());
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<Product>> getActiveProducts() {
        return ResponseEntity.ok(productService.getActiveProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Product>> getProductById(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<?> postProduct(@RequestBody @Valid Product product, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Error de validación en los datos de entrada.");
        }

        Product createdProduct = productService.postProduct(product);
        return ResponseEntity.ok(createdProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putProduct(@RequestBody @Valid Product product, @PathVariable Integer id, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Error de validación en los datos de entrada.");
        }
        return ResponseEntity.ok(productService.putProduct(id, product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.deleteProduct(id));
    }
}