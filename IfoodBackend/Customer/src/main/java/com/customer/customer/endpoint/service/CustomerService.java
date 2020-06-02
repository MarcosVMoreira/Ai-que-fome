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

    public boolean saveOutput (@Valid @RequestBody Customer customer);

    public boolean deleteOutput (@PathVariable Long id);

    public boolean updateOutput (@RequestBody Customer customer);

    public void saveInput (@Valid @RequestBody Customer customer);

    public void deleteInput (@PathVariable Long id);

    public void updateInput (@RequestBody Customer customer);

    public void verifyIfCustomerExists(Long id);

    public void verifyIfCustomerExists(String name);

}
