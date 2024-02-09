package com.abmApi.abmApi.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abmApi.abmApi.entities.Tax;
import com.abmApi.abmApi.repositories.TaxRepository;

@Service
public class TaxService {

    @Autowired
    TaxRepository taxRepository;

    public List<Tax> getTax() {
        return taxRepository.findAll();
    }
    
    public List<Tax> getActiveTax() {
        return taxRepository.findActiveTaxes();
    }

    public Optional<Tax> getTaxById(Integer id) {
        return taxRepository.findById(id);
    }

    public Tax postTax(Tax tax) {
        taxRepository.save(tax);
        return tax;
    }

    public Optional<Tax> deleteTax(Integer id) {
        Optional<Tax> taxOptional = taxRepository.findById(id);

        if (taxOptional.isPresent()) {
            Tax tax = taxOptional.get();
            taxRepository.deleteById(id);
            return Optional.of(tax);
        } else {
            return Optional.empty();
        }
    }

    public String putTax(Integer id, Tax tax) {
        Optional<Tax> optionalExistingTax = taxRepository.findById(id);

        if (optionalExistingTax.isPresent()) {
            Tax existingTax = optionalExistingTax.get();

            existingTax.setName(tax.getName());
            existingTax.setDeleted(tax.getDeleted());

            taxRepository.save(existingTax);

            return "Tax with ID " + id + " updated successfully.";
        } else {
            return "Tax with ID " + id + " not found.";
        }
    }
}
