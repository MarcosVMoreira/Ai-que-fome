package com.customer.customer.endpoint.controller;

import com.customer.customer.endpoint.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<?> getAddressById (@PathVariable Long id) {
        return new ResponseEntity<>(addressService.getAddressById(id), HttpStatus.OK);
    }

    @GetMapping("findByCustomerID/{customerID}")
    public ResponseEntity<?> getAddressByCustomerID (@PathVariable Long customerID) {
        return new ResponseEntity<>(addressService.findAddressByCustomerID(customerID), HttpStatus.OK);
    }

}
