package com.customer.customer.endpoint.controller;

import com.customer.customer.endpoint.DTO.Customer;
import com.customer.customer.endpoint.repository.CustomerRepository;
import com.customer.customer.endpoint.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public ResponseEntity<?> listAll () {
        return new ResponseEntity<>(customerService.listAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getCustomerById (@PathVariable Long id) {
        return new ResponseEntity<>(customerService.getCustomerById(id), HttpStatus.OK);
    }

    @GetMapping("findByName/{name}")
    public ResponseEntity<?> getCustomerByName (@PathVariable String name) {
        return new ResponseEntity<>(customerService.findCustomerByName(name), HttpStatus.OK);
    }
}
