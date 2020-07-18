package com.customer.customer.endpoint.service;

import com.customer.customer.endpoint.model.DTO.AddressDTO;
import com.customer.customer.endpoint.model.entity.Address;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;

public interface AddressService {

    public List<AddressDTO> listAll ();

    public AddressDTO getAddressById (@PathVariable("id") String id);

    public List<AddressDTO> getAddressByCustomerID (@PathVariable String id);

    public AddressDTO save (@Valid @RequestBody AddressDTO address);

    public void delete (@PathVariable String id);

    public AddressDTO update (@RequestBody AddressDTO address);

    public void verifyIfAddressExist(String id);

}
