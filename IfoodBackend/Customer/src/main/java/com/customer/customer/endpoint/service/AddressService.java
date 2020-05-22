package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.DTO.Address;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.Optional;

public interface AddressService {

    public Iterable<Address> listAll ();

    public Optional<Address> getAddressById (@PathVariable("id") Long id);

    public Iterable<Address> findAddressByCustomerID (@PathVariable Long id);

    public void save (@Valid @RequestBody Address address);

    public void delete (@PathVariable Long id);

    public void update (@RequestBody Address address);

    public boolean verifyIfCustomerHasAddress(Long id);

}
