package com.customer.customer.endpoint.repository;

import com.customer.customer.endpoint.model.entity.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface CustomerRepository extends MongoRepository<Customer, String> {

    List<Customer> findByNameIgnoreCaseContaining (String name);

}
