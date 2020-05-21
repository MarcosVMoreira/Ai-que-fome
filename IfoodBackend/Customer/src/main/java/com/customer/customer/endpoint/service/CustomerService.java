package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.DTO.Customer;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

public interface CustomerService {

    public ResponseEntity<Customer> listAll ();

    public ResponseEntity<?> getCustomerById (@PathVariable("id") Long id);

    public ResponseEntity<?> findCustomerByName (@PathVariable String name);

    public ResponseEntity<?> save (@Valid @RequestBody Customer customer);

    public ResponseEntity<?> delete (@PathVariable Long id);

    public ResponseEntity<?> update (@RequestBody Customer customer);

    public void verifyIfCustomerExists(Long id);

}
