package com.ifood.customer.endpoint.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Document
@AllArgsConstructor
@Builder
public class Merchant {

    @Id
    private String id;

    @NotEmpty(message = "400.003")
    @Indexed(unique=true)
    private String document;

    @NotEmpty(message = "400.003")
    private String name;

    @NotEmpty(message = "400.003")
    @Indexed(unique=true)
    private String email;

    @NotEmpty(message = "400.003")
    private String logo;

    @NotEmpty(message = "400.003")
    private String category;

    @NotEmpty(message = "400.003")
    private String phone;

    @NotEmpty(message = "400.003")
    private String country;

    @NotEmpty(message = "400.003")
    private String state;

    @NotEmpty(message = "400.003")
    private String city;

    @NotEmpty(message = "400.003")
    private String neighborhood;

    @NotEmpty(message = "400.003")
    private String streetName;

    @NotEmpty(message = "400.003")
    private String streetNumber;

    @NotEmpty(message = "400.003")
    private String postalCode;

    @NotNull(message = "400.003")
    private boolean availability;

    private List<AllowedPayment> allowedPayments;

    private List<Category> categories;

    private List<SKU> skus;

}
