package com.ifood.merchant.endpoint.model.mapper;

import com.ifood.merchant.endpoint.model.entity.Customer;
import com.ifood.merchant.endpoint.model.dto.CustomerDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CustomerMapper {

    CustomerMapper INSTANCE = Mappers.getMapper(CustomerMapper.class);

    CustomerDTO customerToCustomerDTO (Customer customer);

    Customer customerDTOToCustomer (CustomerDTO customerDTO);

}

