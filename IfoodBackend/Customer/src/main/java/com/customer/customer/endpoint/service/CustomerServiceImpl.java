package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.DTO.Customer;
import com.customer.customer.endpoint.repository.CustomerRepository;
import com.customer.customer.message.MessageProducer;
import com.customer.customer.message.MessageSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import java.util.Optional;

@Component
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private MessageProducer messageProducer;

    @Autowired
    private MessageSource messageSource;

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
    public boolean save (@Valid Customer customer) {
        return messageProducer.sendMessageSaveCustomer(customer, messageSource);
    }

    @Override
    public boolean delete (Long id) {
        return messageProducer.sendMessageDeleteCustomer(id, messageSource);
    }

    @Override
    public boolean update (Customer customer) {
        return messageProducer.sendMessageUpdateCustomer(customer, messageSource);
    }

    @Override
    public boolean verifyIfCustomerExists (Long id) {
        return false;
    }
}
