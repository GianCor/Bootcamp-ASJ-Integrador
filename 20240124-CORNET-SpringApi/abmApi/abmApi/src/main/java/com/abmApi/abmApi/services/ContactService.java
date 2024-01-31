package com.abmApi.abmApi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abmApi.abmApi.entities.Contact;
import com.abmApi.abmApi.repositories.ContactRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public Optional<Contact> getContactById(Integer id) {
        return contactRepository.findById(id);
    }

    public Contact createContact(Contact contact) {
        return contactRepository.save(contact);
    }

    public Optional<Contact> deleteContact(Integer id) {
        Optional<Contact> contactOptional = contactRepository.findById(id);

        if (contactOptional.isPresent()) {
            Contact contact = contactOptional.get();
            contactRepository.deleteById(id);
            return Optional.of(contact);
        } else {
            return Optional.empty();
        }
    }

    public String putContact(Integer id, Contact contact) {
        Optional<Contact> optionalExistingContact = contactRepository.findById(id);

        if (optionalExistingContact.isPresent()) {
            Contact existingContact = optionalExistingContact.get();
            existingContact.setContactName(contact.getContactName());
            existingContact.setContactLastName(contact.getContactLastName());
            existingContact.setContactEmail(contact.getContactEmail());
            existingContact.setContactPhone(contact.getContactPhone());
            existingContact.setContactRole(contact.getContactRole());

            contactRepository.save(existingContact);

            return "Contact with ID " + id + " updated successfully.";
        } else {
            return "Contact with ID " + id + " not found.";
        }
    }
}