package com.ifood.order.endpoint.repository;


import com.ifood.order.endpoint.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order, String> {



}