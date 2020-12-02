package com.ifood.customer.endpoint.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@AllArgsConstructor
@Builder
public class Option {

    @Id
    private String id;

    private String name;

    private String sequence;

    private String minQuantity;

    private String maxQuantity;

    private String price;

}