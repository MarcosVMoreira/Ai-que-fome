package com.customer.customer.endpoint.repository;

import com.customer.customer.endpoint.entity.Address;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.List;


public interface AddressRepository extends MongoRepository<Address, String> {

    List<Address> findByidCustomer (String idCustomer);

}
