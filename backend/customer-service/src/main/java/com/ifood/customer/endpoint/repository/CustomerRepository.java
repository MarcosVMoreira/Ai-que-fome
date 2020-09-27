package com.ifood.customer.endpoint.repository;


import com.ifood.customer.endpoint.model.entity.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CustomerRepository extends MongoRepository<Customer, String> {

    List<Customer> findByNameIgnoreCaseContaining (String name);

}
