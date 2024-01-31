package com.abmApi.abmApi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abmApi.abmApi.entities.Field;
import com.abmApi.abmApi.repositories.FieldRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FieldService {

    @Autowired
    private FieldRepository fieldRepository;

    public List<Field> getAllFields() {
        return fieldRepository.findAll();
    }

    public Optional<Field> getFieldById(Integer id) {
        return fieldRepository.findById(id);
    }

    public Field createField(Field field) {
        return fieldRepository.save(field);
    }

    public Optional<Field> deleteField(Integer id) {
        Optional<Field> fieldOptional = fieldRepository.findById(id);

        if (fieldOptional.isPresent()) {
            Field field = fieldOptional.get();
            fieldRepository.deleteById(id);
            return Optional.of(field);
        } else {
            return Optional.empty();
        }
    }

    public String putField(Integer id, Field field) {
        Optional<Field> optionalExistingField = fieldRepository.findById(id);

        if (optionalExistingField.isPresent()) {
            Field existingField = optionalExistingField.get();
            existingField.setName(field.getName());

            fieldRepository.save(existingField);

            return "Field with ID " + id + " updated successfully.";
        } else {
            return "Field with ID " + id + " not found.";
        }
    }
}