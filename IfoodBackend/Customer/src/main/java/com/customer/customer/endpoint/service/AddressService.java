package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.entity.Address;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;

public interface AddressService {

    public List<Address> listAll ();

    public Address getAddressById (@PathVariable("id") String id);

    public List<Address> findAddressByCustomerID (@PathVariable String id);

    public Address save (@Valid @RequestBody Address address);

    public void delete (@PathVariable String id);

    public Address update (@RequestBody Address address);

    public void verifyIfCustomerHasAddress(String id);

    public void verifyIfAddressExist(String id);

}
