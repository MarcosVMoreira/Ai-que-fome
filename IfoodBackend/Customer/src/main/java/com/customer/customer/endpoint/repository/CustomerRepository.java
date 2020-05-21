package com.customer.customer.endpoint.repository;

import com.customer.customer.endpoint.DTO.Customer;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

    List<Customer> findByNameIgnoreCaseContaining (String name);

}
