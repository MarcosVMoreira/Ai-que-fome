package com.customer.customer.endpoint.repository;

import com.customer.customer.endpoint.DTO.Address;
import org.springframework.data.repository.CrudRepository;

public interface AddressRepository extends CrudRepository<Address, Long> {
}
