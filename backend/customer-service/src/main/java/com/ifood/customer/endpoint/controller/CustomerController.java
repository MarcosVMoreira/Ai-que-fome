package com.ifood.customer.endpoint.controller;

import com.ifood.customer.endpoint.model.dto.CustomerDTO;
import com.ifood.customer.endpoint.service.CustomerServiceImpl;
import io.swagger.annotations.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("customers")
@Api(value = "Endpoints to manage customer")
public class CustomerController {

    private CustomerServiceImpl customerServiceImpl;

    public CustomerController (CustomerServiceImpl customerServiceImpl) {
        this.customerServiceImpl = customerServiceImpl;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<CustomerDTO> listAll (Pageable pageable) {
        return new PageImpl<>(customerServiceImpl.listAll(pageable));
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public CustomerDTO getCustomerById (@PathVariable String id) {
        return customerServiceImpl.getCustomerById(id);
    }

    @GetMapping("byEmail/{name}")
    @ResponseStatus(HttpStatus.OK)
    public CustomerDTO getCustomerByName (@PathVariable String email) {
        return customerServiceImpl.findCustomerByEmail(email);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerDTO save (@Valid @RequestBody CustomerDTO customerDTO) {
        return customerServiceImpl.save(customerDTO);
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public CustomerDTO update (@Valid @RequestBody CustomerDTO customerDTO, @PathVariable String id) {
        return customerServiceImpl.update(customerDTO, id);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete (@PathVariable String id) {
        customerServiceImpl.delete(id);
    }

}
