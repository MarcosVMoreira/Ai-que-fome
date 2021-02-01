package com.ifood.merchant.endpoint.controller;

import com.ifood.merchant.endpoint.model.dto.AddressDTO;
import com.ifood.merchant.endpoint.model.dto.CustomerDTO;
import com.ifood.merchant.endpoint.model.entity.MerchantRate;
import com.ifood.merchant.endpoint.service.CustomerServiceImpl;
import io.swagger.annotations.Api;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

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

    /****************** BEGIN ADDRESS ENDPOINTS ******************/

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{customerId}/address/")
    public ResponseEntity<Void> saveAddress (@PathVariable String customerId,
                                             @Valid @RequestBody AddressDTO addressDTO,
                                      UriComponentsBuilder componentsBuilder) {
        List<String> list = customerServiceImpl.saveAddress(customerId, addressDTO);
        return ResponseEntity.created(componentsBuilder.path("customer/customers/"+list.get(0)+"/address/{id}").
                buildAndExpand(list.get(1)).toUri()).build();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{customerId}/address/{addressId}")
    public AddressDTO getAddress (@PathVariable String customerId,
                                  @PathVariable String addressId) {
        return customerServiceImpl.getAddressById(customerId, addressId);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{customerId}/address/{addressId}")
    public CustomerDTO updateAddress (@PathVariable String customerId,
                                      @PathVariable String addressId,
                                      @Valid @RequestBody AddressDTO addressDTO) {
        return customerServiceImpl.updateAddress(customerId, addressId, addressDTO);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{customerId}/address/{addressId}")
    public void deleteAddress (@PathVariable String customerId,
                               @PathVariable String addressId) {
        customerServiceImpl.deleteAddress(customerId, addressId);
    }

    /****************** END ADDRESS ENDPOINTS ******************/

    @PostMapping("/{customerId}/rates")
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerDTO saveRate (@PathVariable String customerId,
                                 @Valid @RequestBody MerchantRate merchantRate) {
        return customerServiceImpl.saveRate(customerId, merchantRate);
    }
}