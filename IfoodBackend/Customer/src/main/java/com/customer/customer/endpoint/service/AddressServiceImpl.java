package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.DTO.Address;
import com.customer.customer.endpoint.repository.AddressRepository;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Component
public class AddressServiceImpl implements AddressService {

    private AddressRepository addressRepository;

    @Override
    public Iterable<Address> listAll () {
        return addressRepository.findAll();
    }

    @Override
    public Optional<Address> getAddressById (Long id) {
        return addressRepository.findById(id);
    }

    @Override
    public List<Address> findAddressByCustomerID (Long id) {
        return addressRepository.findByidCustomer(id);
    }

    @Override
    public void save (@Valid Address address) {

    }

    @Override
    public void delete (Long id) {

    }

    @Override
    public void update (Address address) {

    }

    @Override
    public boolean verifyIfCustomerHasAddress (Long id) {
        return false;
    }
}
