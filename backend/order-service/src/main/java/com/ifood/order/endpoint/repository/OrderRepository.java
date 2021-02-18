package com.ifood.order.endpoint.repository;


import com.ifood.order.endpoint.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByIdCustomer(String idCustomer);

    List<Order> findByIdMerchant(String idMerchant);

    List<Order> findByIdMerchantAndIdCustomer(String idMerchant, String idCustomer);
}