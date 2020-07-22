package com.customer.customer.endpoint.model.mapper;

import com.customer.customer.endpoint.model.DTO.CustomerDTO;
import com.customer.customer.endpoint.model.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CustomerMapper {

    CustomerMapper INSTANCE = Mappers.getMapper(CustomerMapper.class);

    CustomerDTO customerToCustomerDTO (Customer customer);

    Customer customerDTOToCustomer (CustomerDTO customerDTO);

}

