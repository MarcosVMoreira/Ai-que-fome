package com.customer.customer.endpoint.controller;

import com.customer.customer.endpoint.entity.Customer;
import com.customer.customer.endpoint.repository.CustomerRepository;
import com.customer.customer.endpoint.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping
    public ResponseEntity<List<Customer>> listAll () {
        return new ResponseEntity<>(customerService.listAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Customer> getCustomerById (@Valid @PathVariable String id) {
        return new ResponseEntity<>(customerService.getCustomerById(id), HttpStatus.OK);
    }

    @GetMapping("findByName/{name}")
    public ResponseEntity<List<Customer>> getCustomerByName (@Valid @PathVariable String name) {
        return new ResponseEntity<>(customerService.findCustomerByName(name), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Customer> save (@Valid @RequestBody Customer customer) {

        return new ResponseEntity<>(customerRepository.save(customer),HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Customer> update (@Valid @RequestBody Customer customer) {
        return new ResponseEntity<>(customerService.update(customer), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete (@Valid @PathVariable String id) {
        customerService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
