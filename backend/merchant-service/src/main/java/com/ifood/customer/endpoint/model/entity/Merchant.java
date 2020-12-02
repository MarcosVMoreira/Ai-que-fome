package com.ifood.customer.endpoint.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
@AllArgsConstructor
@Builder
public class Merchant {

    @Id
    private String id;

    private String name;

    private String logo;

    private String category;

    private String phones;

    private String country;

    private String state;

    private String city;

    private String neighborhood;

    private String streetName;

    private String streetNumber;

    private String postalCode;

    private String availability;

    private List<AllowedPayment> allowedPayments;

    private List<Category> categories;



}
