package com.customer.customer.endpoint.controller;

import com.customer.customer.endpoint.DTO.Address;
import com.customer.customer.endpoint.DTO.Customer;
import com.customer.customer.endpoint.error.ResourceNotFoundException;
import com.customer.customer.endpoint.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping
    public ResponseEntity<?> listAll () {
        return new ResponseEntity<>(addressService.listAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getAddressById (@Valid @PathVariable Long id) {
        return new ResponseEntity<>(addressService.getAddressById(id), HttpStatus.OK);
    }

    @GetMapping("findByCustomerID/{customerID}")
    public ResponseEntity<?> getAddressByCustomerID (@Valid @PathVariable Long customerID) {
        return new ResponseEntity<>(addressService.findAddressByCustomerID(customerID), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> save (@Valid @RequestBody Address address) {
        addressService.saveOutput(address);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> update (@Valid @RequestBody Address address) {
        addressService.updateOutput(address);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete (@Valid @PathVariable Long id) {
        addressService.deleteOutput(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
