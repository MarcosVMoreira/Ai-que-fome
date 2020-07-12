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
import java.util.Optional;

//@Component
@Service
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
    public Optional<Customer> getCustomerById (String id) {
        verifyByIdIfCustomerExists(id);
        return customerRepository.findById(id);
    }

    @Override
    public Iterable<Customer> findCustomerByName (String name) {
        verifyByNameIfCustomerExists(name);
        return customerRepository.findByNameIgnoreCaseContaining(name);
    }

    @Override
    public boolean saveOutput (@Valid Customer customer) {
        return messageProducer.sendMessageSaveCustomer(customer, messageSource);
    }

    @Override
    public boolean deleteOutput (String id) {
        verifyByIdIfCustomerExists(id);
        return false;
    }

    @Override
    public boolean updateOutput (Customer customer) {
        verifyByIdIfCustomerExists(customer.getId());
        return messageProducer.sendMessageUpdateCustomer(customer, messageSource);
    }

    @Override
    public void saveInput (@Valid Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public void deleteInput (String id) {
        verifyByIdIfCustomerExists(id);
        customerRepository.deleteById(id);
    }

    @Override
    public void updateInput (Customer customer) {
        verifyByIdIfCustomerExists(customer.getId());
        customerRepository.save(customer);
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
