package com.customer.customer.endpoint.repository;

import com.customer.customer.endpoint.entity.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface CustomerRepository extends MongoRepository<Customer, String> {

    List<Customer> findByNameIgnoreCaseContaining (String name);

}
