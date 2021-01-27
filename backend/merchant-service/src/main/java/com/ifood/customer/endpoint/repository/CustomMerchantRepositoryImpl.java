package com.ifood.customer.endpoint.repository;

import com.ifood.customer.endpoint.enumeration.AllowedPaymentEnum;
import com.ifood.customer.endpoint.enumeration.MerchantTypeEnum;
import com.ifood.customer.endpoint.model.entity.Category;
import com.ifood.customer.endpoint.model.entity.Merchant;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@RequiredArgsConstructor
public class CustomMerchantRepositoryImpl implements CustomMerchantRepository {

    private final MongoTemplate mongoTemplate;

    private Query dynamicQuery = new Query();

    @Override
    public List<Merchant> findByNameAndCity(Pageable pageable, String name, String city) {

        if (city != null) {
            Criteria cityCriteria = Criteria.where("city").is(city);
            dynamicQuery.addCriteria(cityCriteria);
        }

        if (name != null) {
            Criteria nameCriteria = Criteria.where("name").is(name);
            dynamicQuery.addCriteria(nameCriteria);
        }

        List<Merchant> merchantList = mongoTemplate.find(dynamicQuery, Merchant.class, "merchant");

        dynamicQuery = new Query();

        return merchantList;
    }
}