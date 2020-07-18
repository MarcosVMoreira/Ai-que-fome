package com.customer.customer.endpoint.controller;

import com.customer.customer.endpoint.model.DTO.AddressDTO;
import com.customer.customer.endpoint.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping
    public ResponseEntity<List<AddressDTO>> listAll () {
        return new ResponseEntity<>(addressService.listAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AddressDTO> getAddressById (@Valid @PathVariable String id) {
        return new ResponseEntity<>(addressService.getAddressById(id), HttpStatus.OK);
    }

    @GetMapping("/findByCustomerID/{customerID}")
    public ResponseEntity<List<AddressDTO>> getAddressByCustomerID (@Valid @PathVariable String customerID) {
        return new ResponseEntity<>(addressService.getAddressByCustomerID(customerID), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AddressDTO> save (@Valid @RequestBody AddressDTO addressDTO) {
        return new ResponseEntity<>(addressService.save(addressDTO), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<AddressDTO> update (@Valid @RequestBody AddressDTO addressDTO) {
        return new ResponseEntity<>(addressService.update(addressDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete (@Valid @PathVariable String id) {
        addressService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
