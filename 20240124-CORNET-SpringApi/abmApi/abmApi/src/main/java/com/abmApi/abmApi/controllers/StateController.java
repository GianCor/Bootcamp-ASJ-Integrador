package com.abmApi.abmApi.controllers;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.abmApi.abmApi.entities.State;
import com.abmApi.abmApi.services.StateService;

@RestController
@RequestMapping("/state")
public class StateController {

    @Autowired
    private StateService stateService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("State test successful");
    }

    @GetMapping
    public ResponseEntity<List<State>> getAllStates() {
        return ResponseEntity.ok(stateService.getAllStates());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<State>> getStateById(@PathVariable Integer id) {
        return ResponseEntity.ok(stateService.getStateById(id));
    }

    @PostMapping
    public ResponseEntity<?> createState(@RequestBody @Valid State state, BindingResult bindingResult) {
        State createdState = stateService.createState(state);
        return ResponseEntity.ok(createdState);
    }
}