package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.model.entity.Customer;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;

public interface CustomerService {

    public List<Customer> listAll ();

    public Customer getCustomerById (@PathVariable("id") String id);

    public List<Customer> findCustomerByName (@PathVariable String name);

    public Customer save (@Valid @RequestBody Customer customer);

    public void delete (@PathVariable String id);

    public Customer update (@RequestBody Customer customer);

    public void verifyByIdIfCustomerExists (String id);

    public void verifyByNameIfCustomerExists (String name);

}
