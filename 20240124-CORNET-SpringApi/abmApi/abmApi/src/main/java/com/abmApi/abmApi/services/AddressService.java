package com.abmApi.abmApi.services;

import com.abmApi.abmApi.entities.Address;
import com.abmApi.abmApi.repositories.AddressRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;

    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    public Optional<Address> getAddressById(Integer id) {
        return addressRepository.findById(id);
    }

    public Address createAddress(Address address) {
        return addressRepository.save(address);
    }
    
    public Optional<Address> deleteAddress(Integer id) {
    	Optional<Address> address = addressRepository.findById(id);
    	addressRepository.deleteById(id);
    	return address;
    }
    
    public Address updateAddress(Integer id, Address updatedAddress) {
        Optional<Address> existingAddress = addressRepository.findById(id);

        if (existingAddress.isPresent()) {
            Address addressToUpdate = existingAddress.get();
            addressToUpdate.setStreet(updatedAddress.getStreet());
            addressToUpdate.setNumber(updatedAddress.getNumber());
            addressToUpdate.setCity(updatedAddress.getCity());
            addressToUpdate.getCity().setState(updatedAddress.getCity().getState());
            addressToUpdate.getCity().getState().setCountry(updatedAddress.getCity().getState().getCountry());
            
            return addressRepository.save(addressToUpdate);
        } else {
            throw new EntityNotFoundException("Address with ID " + id + " not found.");
        }
    }
}