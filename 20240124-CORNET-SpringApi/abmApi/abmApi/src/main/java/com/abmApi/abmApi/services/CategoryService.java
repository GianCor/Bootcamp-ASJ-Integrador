package com.abmApi.abmApi.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abmApi.abmApi.entities.Category;
import com.abmApi.abmApi.repositories.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Integer id) {
        return categoryRepository.findById(id);
    }

    public Category postCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Optional<Category> deleteCategory(Integer id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);

        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            categoryRepository.deleteById(id);
            return Optional.of(category);
        } else {
            return Optional.empty();
        }
    }

    public String putCategory(Integer id, Category category) {
        Optional<Category> optionalExistingCategory = categoryRepository.findById(id);

        if (optionalExistingCategory.isPresent()) {
            Category existingCategory = optionalExistingCategory.get();

            existingCategory.setName(category.getName());
            existingCategory.setDeleted(category.getDeleted());
            categoryRepository.save(existingCategory);

            return "Category with ID " + id + " updated successfully.";
        } else {
            return "Category with ID " + id + " not found.";
        }
    }
}