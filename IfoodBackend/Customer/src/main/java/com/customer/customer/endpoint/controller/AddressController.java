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
    @ResponseStatus(HttpStatus.OK)
    public List<AddressDTO> listAll () {
        return addressService.listAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AddressDTO getAddressById (@Valid @PathVariable String id) {
        return addressService.getAddressById(id);
    }

    @GetMapping("/findByCustomerID/{customerID}")
    @ResponseStatus(HttpStatus.OK)
    public List<AddressDTO> getAddressByCustomerID (@Valid @PathVariable String customerID) {
        return addressService.getAddressByCustomerID(customerID);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AddressDTO save (@Valid @RequestBody AddressDTO addressDTO) {
        return addressService.save(addressDTO);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AddressDTO update (@PathVariable String id, @Valid @RequestBody AddressDTO addressDTO) {
        return addressService.update(id, addressDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete (@Valid @PathVariable String id) {
        addressService.delete(id);
    }

}
