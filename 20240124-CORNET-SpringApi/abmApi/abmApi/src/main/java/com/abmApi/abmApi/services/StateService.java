package com.abmApi.abmApi.services;

import com.abmApi.abmApi.entities.State;
import com.abmApi.abmApi.repositories.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StateService {

    @Autowired
    private StateRepository stateRepository;

    public List<State> getAllStates() {
        return stateRepository.findAll();
    }

    public Optional<State> getStateById(Integer id) {
        return stateRepository.findById(id);
    }

    public State createState(State state) {
        return stateRepository.save(state);
    }
}