package com.address.addressservice.endpoint.service;

import com.address.addressservice.endpoint.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class AddressServiceImpl {

    @Autowired
    private AddressRepository addressDAO;

}
