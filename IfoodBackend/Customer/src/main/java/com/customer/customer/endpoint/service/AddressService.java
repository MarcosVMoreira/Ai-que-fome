package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.DTO.Address;
import com.customer.customer.endpoint.DTO.Customer;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

public interface AddressService {

    public ResponseEntity<?> listAll ();

    public ResponseEntity<?> getAddressById (@PathVariable("id") Long id);

    public ResponseEntity<?> findAddressByCustomerID (@PathVariable Long id);

    public ResponseEntity<?> save (@Valid @RequestBody Address address);

    public ResponseEntity<?> delete (@PathVariable Long id);

    public ResponseEntity<?> update (@RequestBody Address address);

    public void verifyIfAddressExists(Long id);

}
