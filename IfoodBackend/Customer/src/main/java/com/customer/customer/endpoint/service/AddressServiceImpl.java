package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.entity.Address;
import com.customer.customer.endpoint.error.ResourceNotFoundException;
import com.customer.customer.endpoint.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public List<Address> listAll () {
        return addressRepository.findAll();
    }

    @Override
    public Address getAddressById (String id) {
        return addressRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Address not found for given ID: "+id));
    }

    @Override
    public List<Address> findAddressByCustomerID (String id) {
        return addressRepository.findByidCustomer(id);
    }

    @Override
    public Address save(@Valid Address address) {
        return addressRepository.save(address);
    }

    @Override
    public void delete (String id) {
        verifyIfAddressExist(id);
        addressRepository.deleteById(id);
    }

    @Override
    public Address update (Address address) {
        verifyIfAddressExist(address.getId());
        return addressRepository.save(address);
    }

    @Override
    public void verifyIfCustomerHasAddress (String id) {
        if (addressRepository.findByidCustomer(id).isEmpty()) {
            throw new ResourceNotFoundException("Address not found for customer ID: " + id);
        }
    }

    @Override
    public void verifyIfAddressExist (String id) {
        if (addressRepository.findById(id).isEmpty()) {
            throw new ResourceNotFoundException("Address not found for ID: " + id);
        }
    }

}
