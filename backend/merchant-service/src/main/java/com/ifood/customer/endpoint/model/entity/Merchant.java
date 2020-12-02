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

    @NotEmpty(message = "The field 'document' is mandatory")
    @Indexed(unique=true)
    private String document;

    @NotEmpty(message = "The field 'name' is mandatory")
    private String name;

    @NotEmpty(message = "The field 'logo' is mandatory")
    private String logo;

    @NotEmpty(message = "The field 'category' is mandatory")
    private String category;

    @NotEmpty(message = "The field 'phone' is mandatory")
    private String phone;

    @NotEmpty(message = "The field 'country' is mandatory")
    private String country;

    @NotEmpty(message = "The field 'state' is mandatory")
    private String state;

    @NotEmpty(message = "The field 'city' is mandatory")
    private String city;

    @NotEmpty(message = "The field 'neighborhood' is mandatory")
    private String neighborhood;

    @NotEmpty(message = "The field 'streetName' is mandatory")
    private String streetName;

    @NotEmpty(message = "The field 'streetNumber' is mandatory")
    private String streetNumber;

    @NotEmpty(message = "The field 'postalCode' is mandatory")
    private String postalCode;

    @NotNull(message = "The field 'availability' is mandatory")
    private boolean availability;

    private List<AllowedPayment> allowedPayments;

    private List<Category> categories;

    private List<SKU> skus;

}
