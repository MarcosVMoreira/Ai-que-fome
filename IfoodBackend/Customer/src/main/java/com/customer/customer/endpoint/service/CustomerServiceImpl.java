package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.entity.Customer;
import com.customer.customer.endpoint.error.ResourceNotFoundException;
import com.customer.customer.endpoint.repository.CustomerRepository;
import com.customer.customer.message.producer.MessageProducer;
import com.customer.customer.message.producer.MessageSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private MessageProducer messageProducer;

    @Autowired
    private MessageSource messageSource;

    @Override
    public List<Customer> listAll () {
        return customerRepository.findAll();
    }

    @Override
    public Customer getCustomerById (String id) {
        verifyByIdIfCustomerExists(id);
        return customerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Customer not found for given ID: "+id));
    }

    @Override
    public List<Customer> findCustomerByName (String name) {
        verifyByNameIfCustomerExists(name);
        return customerRepository.findByNameIgnoreCaseContaining(name);
    }

    @Override
    public Customer save (@Valid Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public void delete (String id) {
        verifyByIdIfCustomerExists(id);
        customerRepository.deleteById(id);
    }

    @Override
    public Customer update (Customer customer) {
        verifyByIdIfCustomerExists(customer.getId());
        return customerRepository.save(customer);
    }

    @Override
    public void verifyByIdIfCustomerExists (String id) {
        if (customerRepository.findById(id).isEmpty()) {
            throw new ResourceNotFoundException("Customer not found for ID: " + id);
        }
    }

    @Override
    public void verifyByNameIfCustomerExists (String nome) {
        if (customerRepository.findByNameIgnoreCaseContaining(nome).isEmpty()) {
            throw new ResourceNotFoundException("Customer not found for name: " + nome);
        }
    }

}
