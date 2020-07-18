package com.customer.customer.endpoint.repository;

import com.customer.customer.endpoint.model.entity.Address;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AddressRepository extends MongoRepository<Address, String> {

    List<Address> findByidCustomer (String idCustomer);

}
