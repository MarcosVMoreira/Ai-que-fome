package com.customer.customer.endpoint.controller;

import com.customer.customer.endpoint.DTO.Customer;
import com.customer.customer.endpoint.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
    public ResponseEntity<?> getCustomerById (@Valid @PathVariable Long id) {
        return new ResponseEntity<>(customerService.getCustomerById(id), HttpStatus.OK);
    }

    @GetMapping("findByName/{name}")
    public ResponseEntity<?> getCustomerByName (@Valid @PathVariable String name) {
        return new ResponseEntity<>(customerService.findCustomerByName(name), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> save (@Valid @RequestBody Customer customer) {
        customerService.saveOutput(customer);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> update (@Valid @RequestBody Customer customer) {
        customerService.updateOutput(customer);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete (@Valid @PathVariable Long id) {
        customerService.deleteOutput(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
