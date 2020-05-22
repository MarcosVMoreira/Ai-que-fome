package com.customer.customer.endpoint.repository;

import com.customer.customer.endpoint.DTO.Address;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AddressRepository extends CrudRepository<Address, Long> {

    List<Address> findByidCustomer (Long idCustomer);

}
