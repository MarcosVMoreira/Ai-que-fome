package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.DTO.Customer;
import com.customer.customer.endpoint.repository.CustomerRepository;
import com.customer.customer.message.producer.MessageProducer;
import com.customer.customer.message.producer.MessageSource;
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
    public boolean saveOutput (@Valid Customer customer) {
        return messageProducer.sendMessageSaveCustomer(customer, messageSource);
    }

    @Override
    public boolean deleteOutput (Long id) {
        return messageProducer.sendMessageDeleteCustomer(id, messageSource);
    }

    @Override
    public boolean updateOutput (Customer customer) {
        return messageProducer.sendMessageUpdateCustomer(customer, messageSource);
    }

    @Override
    public void saveInput (@Valid Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public void deleteInput (Long id) {
        customerRepository.deleteById(id);
    }

    @Override
    public void updateInput (Customer customer) {
        verifyIfCustomerExists(customer.getId());
        customerRepository.save(customer);
    }

    @Override
    public boolean verifyIfCustomerExists (Long id) {
        return false;
    }
}
