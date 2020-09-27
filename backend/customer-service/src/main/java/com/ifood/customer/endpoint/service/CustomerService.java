package com.ifood.customer.endpoint.service;

import com.ifood.customer.endpoint.model.dto.CustomerDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;

public interface CustomerService {

    List<CustomerDTO> listAll (Pageable pageable);

    CustomerDTO getCustomerById (@PathVariable("id") String id);

    List<CustomerDTO> findCustomerByName (@PathVariable String name);

    CustomerDTO save (@Valid @RequestBody CustomerDTO customer);

    void delete (@PathVariable String id);

    CustomerDTO update (@RequestBody CustomerDTO customer);

    void verifyByIdIfCustomerExists (String id);

    void verifyByNameIfCustomerExists (String name);

}
