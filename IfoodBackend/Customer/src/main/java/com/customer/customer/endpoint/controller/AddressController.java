package com.customer.customer.endpoint.controller;

import com.customer.customer.endpoint.entity.Address;
import com.customer.customer.endpoint.error.ResourceNotFoundException;
import com.customer.customer.endpoint.handler.RestExceptionHandler;
import com.customer.customer.endpoint.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping
    public ResponseEntity<List<Address>> listAll () {
        return new ResponseEntity<>(addressService.listAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Address> getAddressById (@Valid @PathVariable String id) {
        return new ResponseEntity<>(addressService.getAddressById(id), HttpStatus.OK);
    }

    @GetMapping("/findByCustomerID/{customerID}")
    public ResponseEntity<List<Address>> getAddressByCustomerID (@Valid @PathVariable String customerID) {
        return new ResponseEntity<>(addressService.findAddressByCustomerID(customerID), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Address> save (@Valid @RequestBody Address address) {
        return new ResponseEntity<>(addressService.save(address), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Address> update (@Valid @RequestBody Address address) {
        return new ResponseEntity<>(addressService.update(address), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete (@Valid @PathVariable String id) {
        addressService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
