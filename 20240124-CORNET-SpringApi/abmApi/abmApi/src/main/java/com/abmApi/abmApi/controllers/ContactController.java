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
import com.abmApi.abmApi.entities.Contact;
import com.abmApi.abmApi.services.ContactService;

@RestController
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Contact test successful");
    }

    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        return ResponseEntity.ok(contactService.getAllContacts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Contact>> getContactById(@PathVariable Integer id) {
        return ResponseEntity.ok(contactService.getContactById(id));
    }

    @PostMapping
    public ResponseEntity<?> createContact(@RequestBody @Valid Contact contact, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = mapValidationErrors(bindingResult);
            return ResponseEntity.badRequest().body(errors);
        }

        Contact createdContact = contactService.createContact(contact);
        return ResponseEntity.ok(createdContact);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putContact(@RequestBody @Valid Contact contact, @PathVariable Integer id, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Error de validación en los datos de entrada.");
        }
        return ResponseEntity.ok(contactService.putContact(id, contact));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Integer id) {
        return ResponseEntity.ok(contactService.deleteContact(id));
    }

    private Map<String, String> mapValidationErrors(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();

        bindingResult.getFieldErrors().forEach((error) -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });

        return errors;
    }
}