package com.abmApi.abmApi.services;

import com.abmApi.abmApi.entities.Country;
import com.abmApi.abmApi.repositories.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public Optional<Country> getCountryById(Integer id) {
        return countryRepository.findById(id);
    }

    public Country createCountry(Country country) {
        return countryRepository.save(country);
    }
}