package com.abmApi.abmApi.controllers;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.abmApi.abmApi.entities.Tax;
import com.abmApi.abmApi.services.TaxService;

@RestController
@RequestMapping("/tax")
public class TaxController {

    @Autowired
    TaxService taxService;

    @GetMapping
    public ResponseEntity<List<Tax>> getTax() {
        return ResponseEntity.ok(taxService.getTax());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Tax>> getTaxById(@PathVariable Integer id) {
        return ResponseEntity.ok(taxService.getTaxById(id));
    }

    @PostMapping
    public ResponseEntity<?> postTax(@RequestBody @Valid Tax tax, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = mapValidationErrors(bindingResult);
            return ResponseEntity.badRequest().body(errors);
        }

        Tax createdTax = taxService.postTax(tax);
        return ResponseEntity.ok(createdTax);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putTax(@RequestBody @Valid Tax tax, @PathVariable Integer id, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Error de validación en los datos de entrada.");
        }
        return ResponseEntity.ok(taxService.putTax(id, tax));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTax(@PathVariable Integer id) {
        return ResponseEntity.ok(taxService.deleteTax(id));
    }

    private Map<String, String> mapValidationErrors(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();

        bindingResult.getFieldErrors().forEach((error) -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });

        return errors;
    }
}
