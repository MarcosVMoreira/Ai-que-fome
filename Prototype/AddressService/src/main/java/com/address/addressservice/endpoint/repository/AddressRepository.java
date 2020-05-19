package com.address.addressservice.endpoint.repository;

import com.address.addressservice.endpoint.model.Address;
import org.springframework.data.repository.CrudRepository;

public interface AddressRepository extends CrudRepository<Address, Long> {

}
