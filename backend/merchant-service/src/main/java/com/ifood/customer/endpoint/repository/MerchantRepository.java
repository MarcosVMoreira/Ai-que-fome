package com.ifood.customer.endpoint.repository;


import com.ifood.customer.endpoint.model.entity.Merchant;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MerchantRepository extends MongoRepository<Merchant, String> {

    Optional<Merchant> findByDocument(String document);

    Optional<Merchant> findByEmail(String email);

    List<Merchant> findByCity(Pageable pageable, String city);

}