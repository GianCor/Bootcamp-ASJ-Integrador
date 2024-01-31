package com.abmApi.abmApi.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abmApi.abmApi.entities.Category;
import com.abmApi.abmApi.entities.Product;
import com.abmApi.abmApi.repositories.ProductRepository;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    CategoryService categoryService;

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Integer id) {
        return productRepository.findById(id);
    }

    public Product postProduct(Product productRequest) {

        Category category = createCategory(productRequest.getCategory());
        categoryService.postCategory(category);

        Product newProduct = new Product();
        newProduct.setSupplier_id(productRequest.getSupplier_id());
        newProduct.setSupplierName(productRequest.getSupplierName());
        newProduct.setCategory(category);
        newProduct.setName(productRequest.getName());
        newProduct.setDescription(productRequest.getDescription());
        newProduct.setPrice(productRequest.getPrice());
        newProduct.setAmount(productRequest.getAmount());
        newProduct.setSubtotal(productRequest.getSubtotal());
        newProduct.setChecked(productRequest.getChecked());

        productRepository.save(newProduct);
        return newProduct;
    }

    public Optional<Product> deleteProduct(Integer id) {
        Optional<Product> product = productRepository.findById(id);
        productRepository.deleteById(id);
        return product;
    }

    public String putProduct(Integer id, Product updatedProduct) {
        Optional<Product> optionalExistingProduct = productRepository.findById(id);

        if (optionalExistingProduct.isPresent()) {
            Product existingProduct = optionalExistingProduct.get();

            existingProduct.setSupplier_id(updatedProduct.getSupplier_id());
            existingProduct.setSupplierName(updatedProduct.getSupplierName());
            existingProduct.setCategory(updatedProduct.getCategory());
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setAmount(updatedProduct.getAmount());
            existingProduct.setSubtotal(updatedProduct.getSubtotal());
            existingProduct.setChecked(updatedProduct.getChecked());

            productRepository.save(existingProduct);

            return "Product with ID " + id + " updated successfully.";
        } else {
            return "Product with ID " + id + " not found.";
        }
    }
    
	private Category createCategory(Category categoryRequest) {
	    Optional<Category> existingCategory = categoryService.getCategoryById(categoryRequest.getId());

	    if (existingCategory.isPresent()) {
	        return existingCategory.get();
	    } else {
	        Category newCategory = new Category();
	        newCategory.setName(categoryRequest.getName());

	        categoryService.postCategory(categoryRequest);

	        return newCategory;
	    }
	}
}