package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.DTO.Customer;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.Optional;

public interface CustomerService {

    public Iterable<Customer> listAll ();

    public Optional<Customer> getCustomerById (@PathVariable("id") Long id);

    public Iterable<Customer> findCustomerByName (@PathVariable String name);

    public boolean save (@Valid @RequestBody Customer customer);

    public boolean delete (@PathVariable Long id);

    public boolean update (@RequestBody Customer customer);

    public boolean verifyIfCustomerExists(Long id);

}
