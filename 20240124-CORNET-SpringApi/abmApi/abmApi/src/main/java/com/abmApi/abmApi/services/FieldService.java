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
    
    public List<Field> getActiveFields() {
        return fieldRepository.findActiveFields();
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

    public Field putField(Integer id, Field field) {
        Optional<Field> optionalExistingField = fieldRepository.findById(id);

        if (optionalExistingField.isPresent()) {
            Field existingField = optionalExistingField.get();
            existingField.setName(field.getName());
            existingField.setDeleted(field.getDeleted());

            fieldRepository.save(existingField);

            return existingField;
        } else {
            return field;
        }
    }
}