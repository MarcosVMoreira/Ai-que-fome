package com.customer.endpoint.service;

import com.customer.endpoint.model.DTO.CustomerDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;

public interface CustomerService {

    public List<CustomerDTO> listAll (Pageable pageable);

    public CustomerDTO getCustomerById (@PathVariable("id") String id);

    public List<CustomerDTO> findCustomerByName (@PathVariable String name);

    public CustomerDTO save (@Valid @RequestBody CustomerDTO customer);

    public void delete (@PathVariable String id);

    public CustomerDTO update (@RequestBody CustomerDTO customer);

    public void verifyByIdIfCustomerExists (String id);

    public void verifyByNameIfCustomerExists (String name);

}
