package com.customerservice.customer.endpoint.repository;

import com.customerservice.customer.endpoint.model.Customer;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Long> {
}
