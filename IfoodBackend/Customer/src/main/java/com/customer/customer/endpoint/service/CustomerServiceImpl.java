package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.DTO.Customer;
import com.customer.customer.endpoint.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import java.util.Optional;

@Component
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Iterable<Customer> listAll () {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> getCustomerById (Long id) {
        return customerRepository.findById(id);
    }

    @Override
    public Iterable<Customer> findCustomerByName (String name) {
        return customerRepository.findByNameIgnoreCaseContaining(name);
    }

    @Override
    public void save (@Valid Customer customer) {

    }

    @Override
    public void delete (Long id) {

    }

    @Override
    public void update (Customer customer) {

    }

    @Override
    public boolean verifyIfCustomerExists (Long id) {
        return false;
    }
}
