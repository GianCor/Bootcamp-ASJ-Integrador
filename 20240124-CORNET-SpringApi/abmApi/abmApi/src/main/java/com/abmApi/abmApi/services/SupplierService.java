package com.abmApi.abmApi.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abmApi.abmApi.entities.Address;
import com.abmApi.abmApi.entities.City;
import com.abmApi.abmApi.entities.Contact;
import com.abmApi.abmApi.entities.Country;
import com.abmApi.abmApi.entities.Field;
import com.abmApi.abmApi.entities.Product;
import com.abmApi.abmApi.entities.State;
import com.abmApi.abmApi.entities.Supplier;
import com.abmApi.abmApi.entities.Tax;
import com.abmApi.abmApi.repositories.SupplierRepository;

@Service
public class SupplierService {
	@Autowired
	SupplierRepository supplierRepository;
	@Autowired
	AddressService addressService;
	@Autowired
	FieldService fieldService;
	@Autowired
	ContactService contactService;
	@Autowired
	CityService cityService;
	@Autowired
	StateService stateService;
	@Autowired
	CountryService countryService;
	@Autowired
	ProductService productService;
	@Autowired
	TaxService taxService;
	
	public List<Supplier> getSupplier(){
		return supplierRepository.findAll();
	}
	
	public Optional<Supplier> getSupplierById(Integer id) {
		return supplierRepository.findById(id);
	}
	
	public Supplier postSupplier(Supplier supplierRequest) {
        Field field = createField(supplierRequest.getField());
        Address address = createAddress(supplierRequest.getAddress());
        Contact contact = createContact(supplierRequest.getContact());
        Tax tax = createTax(supplierRequest.getTax());
        addressService.createAddress(address);
        fieldService.createField(field);
        contactService.createContact(contact);
        taxService.postTax(tax);
        
        Supplier supplier = new Supplier();
        supplier.setSupplierCode(supplierRequest.getSupplierCode());
        supplier.setName(supplierRequest.getName());
        supplier.setField(field);
        supplier.setPhone(supplierRequest.getPhone());
        supplier.setTax(supplierRequest.getTax());
        supplier.setAddress(address);
        supplier.setCuit(supplierRequest.getCuit());
        supplier.setEmail(supplierRequest.getEmail());
        supplier.setContact(contact);
		supplier.setCreated_at(LocalDate.now());
        supplier.setWebsite(supplierRequest.getWebsite());
        supplier.setUrl(supplierRequest.getUrl());
		supplierRepository.save(supplier);
		return supplier;
	}
	
	public Optional<Supplier> deleteSupplier(Integer id) {
	    Optional<Supplier> supplierOptional = supplierRepository.findById(id);

	    if (supplierOptional.isPresent()) {
	        Supplier supplier = supplierOptional.get();

	        List<Product> products = supplier.getProducts();
	        if (products != null && !products.isEmpty()) {
	            for (Product product : products) {
	                productService.deleteProduct(product.getId());
	            }
	        }

	        addressService.deleteAddress(supplier.getAddress().getId());
	        contactService.deleteContact(supplier.getContact().getId());

	        supplierRepository.deleteById(id);

	        return Optional.of(supplier);
	    } else {
	        return Optional.empty();
	    }
	}
	
    public String putSupplier(Integer id, Supplier supplier) {
        Optional<Supplier> optionalExistingSupplier = supplierRepository.findById(id);

        if (optionalExistingSupplier.isPresent()) {
            Supplier existingSupplier = optionalExistingSupplier.get();

            if (!existingSupplier.getAddress().equals(supplier.getAddress())) {
                addressService.updateAddress(existingSupplier.getAddress().getId(), supplier.getAddress());
            }

            if (!existingSupplier.getContact().equals(supplier.getContact())) {
                contactService.putContact(existingSupplier.getContact().getId(), supplier.getContact());
            }

            existingSupplier.setSupplierCode(supplier.getSupplierCode());
            existingSupplier.setName(supplier.getName());
            existingSupplier.setField(supplier.getField());
            existingSupplier.setPhone(supplier.getPhone());
            existingSupplier.setTax(supplier.getTax());
            existingSupplier.setCuit(supplier.getCuit());
            existingSupplier.setEmail(supplier.getEmail());
            existingSupplier.setCreated_at(supplier.getCreated_at());
            existingSupplier.setWebsite(supplier.getWebsite());
            existingSupplier.setUrl(supplier.getUrl());
            existingSupplier.setUpdated_at(LocalDate.now());
            

            supplierRepository.save(existingSupplier);

            return "Supplier with ID " + id + " updated successfully.";
        } else {
            return "Supplier with ID " + id + " not found.";
        }
    }
	
	private Field createField(Field fieldRequest) {
	    Optional<Field> existingField = fieldService.getFieldById(fieldRequest.getId());

	    if (existingField.isPresent()) {
	        return existingField.get();
	    } else {
	        Field newField = new Field();
	        newField.setName(fieldRequest.getName());

	        fieldService.createField(newField);

	        return newField;
	    }
	}

    private Address createAddress(Address addressRequest) {
        Address address = new Address();
        address.setStreet(addressRequest.getStreet());
        address.setNumber(addressRequest.getNumber());
        address.setCity(addressRequest.getCity());
        address.setCp(addressRequest.getCp());
        City city = createCity(addressRequest.getCity());
        address.setCity(city);

        return address;
    }
    
    private Tax createTax(Tax taxRequest) {
    	Optional<Tax> existingTax = taxService.getTaxById(taxRequest.getId());
    	
    	if(existingTax.isPresent()) {
    		return existingTax.get();
    	} else {
            Tax tax = new Tax();
            tax.setName(taxRequest.getName());
            return tax;
    	}
    }

    private City createCity(City cityRequest) {
        Optional<City> existingCity = cityService.getCityById(cityRequest.getId());

        if (existingCity.isPresent()) {
            return existingCity.get();
        } else {
            City newCity = new City();
            newCity.setName(cityRequest.getName());

            State state = createState(cityRequest.getState());
            newCity.setState(state);

            cityService.createCity(newCity);

            return newCity;
        }
    }

    private State createState(State stateRequest) {
        Optional<State> existingState = stateService.getStateById(stateRequest.getId());

        if (existingState.isPresent()) {
            return existingState.get();
        } else {
            State newState = new State();
            newState.setName(stateRequest.getName());

            Country country = createCountry(stateRequest.getCountry());
            newState.setCountry(country);

            stateService.createState(newState);

            return newState;
        }
    }

    private Country createCountry(Country countryRequest) {
        Optional<Country> existingCountry = countryService.getCountryById(countryRequest.getId());

        if (existingCountry.isPresent()) {
            return existingCountry.get();
        } else {
            Country newCountry = new Country();
            newCountry.setName(countryRequest.getName());

            countryService.createCountry(newCountry);

            return newCountry;
        }
    }

    private Contact createContact(Contact contactRequest) {
        Optional<Contact> existingContact = contactService.getContactById(contactRequest.getId());

        if (existingContact.isPresent()) {
            return existingContact.get();
        } else {
            Contact newContact = new Contact();
            newContact.setContactName(contactRequest.getContactName());
            newContact.setContactLastName(contactRequest.getContactLastName());
            newContact.setContactEmail(contactRequest.getContactEmail());
            newContact.setContactPhone(contactRequest.getContactPhone());
            newContact.setContactRole(contactRequest.getContactRole());
            contactService.createContact(newContact);

            return newContact;
        }
    }
}
