package com.ifood.core.repository;


import com.ifood.core.entity.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CustomerRepository extends MongoRepository<Customer, String> {

    List<Customer> findByNameIgnoreCaseContaining (String name);

}
