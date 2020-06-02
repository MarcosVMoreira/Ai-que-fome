package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.DTO.Address;
import com.customer.customer.endpoint.error.ResourceNotFoundException;
import com.customer.customer.endpoint.repository.AddressRepository;
import com.customer.customer.message.producer.MessageProducer;
import com.customer.customer.message.producer.MessageSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import java.io.BufferedWriter;
import java.io.File;
import java.util.List;
import java.util.Optional;

@Component
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private MessageProducer messageProducer;

    @Autowired
    private MessageSource messageSource;

    @Override
    public Iterable<Address> listAll () {
        return addressRepository.findAll();
    }

    @Override
    public Optional<Address> getAddressById (Long id) {
        verifyIfAddressExist(id);
        return addressRepository.findById(id);
    }

    @Override
    public List<Address> findAddressByCustomerID (Long id) {
        verifyIfCustomerHasAddress(id);
        return addressRepository.findByidCustomer(id);
    }

    @Override
    public boolean saveOutput (@Valid Address address) {
        return messageProducer.sendMessageSaveAddress(address, messageSource);
    }

    @Override
    public boolean deleteOutput (Long id) {
        verifyIfAddressExist(id);
        return messageProducer.sendMessageDeleteAddress(id, messageSource);
    }

    @Override
    public boolean updateOutput (Address address) {
        verifyIfAddressExist(address.getId());
        return messageProducer.sendMessageUpdateAddress(address, messageSource);
    }

    @Override
    public void saveInput (@Valid Address address) {
        addressRepository.save(address);
    }

    @Override
    public void deleteInput (Long id) {
        verifyIfAddressExist(id);
        addressRepository.deleteById(id);
    }

    @Override
    public void updateInput (Address address) {
        verifyIfAddressExist(address.getId());
        addressRepository.save(address);
    }

    @Override
    public void verifyIfCustomerHasAddress (Long id) {
        if (addressRepository.findByidCustomer(id).isEmpty()) {
            throw new ResourceNotFoundException("Address not found for customer ID: " + id);
        }
    }

    @Override
    public void verifyIfAddressExist (Long id) {
        if (addressRepository.findById(id).isEmpty()) {
            throw new ResourceNotFoundException("Address not found for ID: " + id);
        }
    }

}
