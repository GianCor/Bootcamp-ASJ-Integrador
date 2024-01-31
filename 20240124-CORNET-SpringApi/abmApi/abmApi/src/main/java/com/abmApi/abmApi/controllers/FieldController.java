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
import com.abmApi.abmApi.entities.Field;
import com.abmApi.abmApi.services.FieldService;

@RestController
@RequestMapping("/field")
public class FieldController {

    @Autowired
    private FieldService fieldService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Field test successful");
    }

    @GetMapping
    public ResponseEntity<List<Field>> getAllFields() {
        return ResponseEntity.ok(fieldService.getAllFields());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Field>> getFieldById(@PathVariable Integer id) {
        return ResponseEntity.ok(fieldService.getFieldById(id));
    }

    @PostMapping
    public ResponseEntity<?> createField(@RequestBody @Valid Field field, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = mapValidationErrors(bindingResult);
            return ResponseEntity.badRequest().body(errors);
        }

        Field createdField = fieldService.createField(field);
        return ResponseEntity.ok(createdField);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putField(@RequestBody @Valid Field field, @PathVariable Integer id, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Error de validación en los datos de entrada.");
        }
        return ResponseEntity.ok(fieldService.putField(id, field));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteField(@PathVariable Integer id) {
        return ResponseEntity.ok(fieldService.deleteField(id));
    }

    private Map<String, String> mapValidationErrors(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();

        bindingResult.getFieldErrors().forEach((error) -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });

        return errors;
    }
}