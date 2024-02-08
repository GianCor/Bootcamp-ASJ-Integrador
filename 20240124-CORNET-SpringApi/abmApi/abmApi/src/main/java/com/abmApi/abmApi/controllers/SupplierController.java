package com.abmApi.abmApi.controllers;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abmApi.abmApi.entities.Supplier;
import com.abmApi.abmApi.services.SupplierService;


@RestController
@RequestMapping("/supplier")
public class SupplierController {
	@Autowired
	SupplierService supplierService;
    
    
	@GetMapping("/test")
	public ResponseEntity<String> test() {
		return ResponseEntity.ok(null);
	}
	
    @GetMapping
    public ResponseEntity<List<Supplier>> getSupplier(){
        return ResponseEntity.ok(supplierService.getSupplier());
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<Supplier>> getActiveSupplier(){
        return ResponseEntity.ok(supplierService.getActiveSuppliers());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Supplier>> getSupplierById(@PathVariable Integer id){
    	return ResponseEntity.ok(supplierService.getSupplierById(id));
    }
    
    @PostMapping
    public ResponseEntity<?> postSupplier(@RequestBody @Valid Supplier supplier, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = mapValidationErrors(bindingResult);
            return ResponseEntity.badRequest().body(errors);
        }

        Supplier createdSupplier = supplierService.postSupplier(supplier);
        return ResponseEntity.ok(createdSupplier);
    }

    private Map<String, String> mapValidationErrors(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();

        bindingResult.getFieldErrors().forEach((error) -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });

        return errors;
    }
	
	@PutMapping("/{id}")
	public ResponseEntity<?> putSupplier(@RequestBody @Valid Supplier supplier, @PathVariable Integer id, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Error de validación en los datos de entrada.");
        }
        return ResponseEntity.ok(supplierService.putSupplier(id, supplier));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteSupplier(@PathVariable Integer id){
		return ResponseEntity.ok(supplierService.deleteSupplier(id));
	}
}