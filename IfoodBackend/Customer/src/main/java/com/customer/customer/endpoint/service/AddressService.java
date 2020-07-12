package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.entity.Address;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.Optional;

public interface AddressService {

    public Iterable<Address> listAll ();

    public Optional<Address> getAddressById (@PathVariable("id") String id);

    public Iterable<Address> findAddressByCustomerID (@PathVariable String id);

    public boolean saveOutput (@Valid @RequestBody Address address);

    public boolean deleteOutput (@PathVariable String id);

    public boolean updateOutput (@RequestBody Address address);

    public void saveInput (@Valid @RequestBody Address address);

    public void deleteInput (@PathVariable String id);

    public void updateInput (@RequestBody Address address);

    public void verifyIfCustomerHasAddress(String id);

    public void verifyIfAddressExist(String id);

}
