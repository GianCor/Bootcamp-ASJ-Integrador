package com.abmApi.abmApi.controllers;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.abmApi.abmApi.entities.City;
import com.abmApi.abmApi.services.CityService;

@RestController
@RequestMapping("/cities")
public class CityController {

    @Autowired
    private CityService cityService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("City test successful");
    }

    @GetMapping
    public ResponseEntity<List<City>> getAllCities() {
        return ResponseEntity.ok(cityService.getAllCities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<City>> getCityById(@PathVariable Integer id) {
        return ResponseEntity.ok(cityService.getCityById(id));
    }

    @PostMapping
    public ResponseEntity<?> createCity(@RequestBody @Valid City city, BindingResult bindingResult) {
        City createdCity = cityService.createCity(city);
        return ResponseEntity.ok(createdCity);
    }
}