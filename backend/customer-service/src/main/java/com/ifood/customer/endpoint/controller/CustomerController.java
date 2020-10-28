package com.ifood.customer.endpoint.controller;

import com.ifood.customer.endpoint.model.dto.AddressDTO;
import com.ifood.customer.endpoint.model.dto.CustomerDTO;
import com.ifood.customer.endpoint.service.CustomerServiceImpl;
import io.swagger.annotations.Api;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;

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

    @GetMapping("email/{email}")
    @ResponseStatus(HttpStatus.OK)
    public CustomerDTO getCustomerByEmail (@PathVariable String email) {
        return customerServiceImpl.findCustomerByEmail(email);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> save (@Valid @RequestBody CustomerDTO customerDTO,
                                      UriComponentsBuilder componentsBuilder) {
        CustomerDTO customer = customerServiceImpl.save(customerDTO);
        return ResponseEntity.created(componentsBuilder.path("customer/customers/{id}").
                buildAndExpand(customer.getId()).toUri()).build();
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

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{customerId}/address/")
    public ResponseEntity<Void> saveAddress (@PathVariable String customerId,
                                             @Valid @RequestBody AddressDTO addressDTO,
                                      UriComponentsBuilder componentsBuilder) {
        CustomerDTO customer = customerServiceImpl.saveAddress(customerId, addressDTO);
        return ResponseEntity.created(componentsBuilder.path("customer/customers/{id}").
                buildAndExpand(customer.getId()).toUri()).build();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{customerId}/address/{addressId}")
    public AddressDTO getAddress (@PathVariable String customerId,
                                            @PathVariable String addressId) {
        return customerServiceImpl.getAddressById(customerId, addressId);
    }

}
