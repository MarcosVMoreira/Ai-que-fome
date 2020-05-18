package com.customerservice.customer.endpoint.service;

import com.customerservice.customer.endpoint.model.Customer;
import com.customerservice.customer.endpoint.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerDAO;

    public Iterable<Customer> listAll () {
        return customerDAO.findAll();
    }

}
