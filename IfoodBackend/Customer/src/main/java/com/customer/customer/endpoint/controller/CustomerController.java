package com.customer.customer.endpoint.controller;

import com.customer.customer.endpoint.model.DTO.CustomerDTO;
import com.customer.customer.endpoint.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<CustomerDTO> listAll () {
        return customerService.listAll();
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public CustomerDTO getCustomerById (@Valid @PathVariable String id) {
        return customerService.getCustomerById(id);
    }

    @GetMapping("findByName/{name}")
    @ResponseStatus(HttpStatus.OK)
    public List<CustomerDTO> getCustomerByName (@Valid @PathVariable String name) {
        return customerService.findCustomerByName(name);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerDTO save (@Valid @RequestBody CustomerDTO customerDTO) {
        return customerService.save(customerDTO);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public CustomerDTO update (@Valid @RequestBody CustomerDTO customerDTO) {
        return customerService.update(customerDTO);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete (@Valid @PathVariable String id) {
        customerService.delete(id);
    }

}
