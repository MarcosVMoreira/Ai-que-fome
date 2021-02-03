package com.ifood.customer.endpoint.repository;


import com.ifood.customer.endpoint.model.entity.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CustomerRepository extends MongoRepository<Customer, String> {

    Optional<Customer> findByEmailIgnoreCaseContaining (String email);

}