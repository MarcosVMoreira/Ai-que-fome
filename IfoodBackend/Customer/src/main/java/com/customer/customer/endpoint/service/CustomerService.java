package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.entity.Customer;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.Optional;

public interface CustomerService {

    public Iterable<Customer> listAll ();

    public Optional<Customer> getCustomerById (@PathVariable("id") String id);

    public Iterable<Customer> findCustomerByName (@PathVariable String name);

    public boolean saveOutput (@Valid @RequestBody Customer customer);

    public boolean deleteOutput (@PathVariable String id);

    public boolean updateOutput (@RequestBody Customer customer);

    public void saveInput (@Valid @RequestBody Customer customer);

    public void deleteInput (@PathVariable String id);

    public void updateInput (@RequestBody Customer customer);

    public void verifyByIdIfCustomerExists (String id);

    public void verifyByNameIfCustomerExists (String name);

}
