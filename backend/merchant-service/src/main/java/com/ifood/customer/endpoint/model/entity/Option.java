package com.ifood.customer.endpoint.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;

@Data
@Document
@AllArgsConstructor
@Builder
public class Option {

    @Id
    private String id;

    @NotEmpty(message = "The field 'name' is mandatory")
    private String name;

    @NotEmpty(message = "The field 'minQuantity' is mandatory")
    private String minQuantity;

    @NotEmpty(message = "The field 'maxQuantity' is mandatory")
    private String maxQuantity;

    @NotEmpty(message = "The field 'price' is mandatory")
    private String price;

}
