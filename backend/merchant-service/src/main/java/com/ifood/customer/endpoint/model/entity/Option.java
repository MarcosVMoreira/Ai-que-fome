package com.ifood.customer.endpoint.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import java.math.BigDecimal;

@Data
@Document
@AllArgsConstructor
@Builder
public class Option {

    @Id
    private String id;

    @NotEmpty(message = "400.003")
    private String name;

    @NotEmpty(message = "400.003")
    private Integer minQuantity;

    @NotEmpty(message = "400.003")
    private Integer maxQuantity;

    @NotEmpty(message = "400.003")
    private BigDecimal price;

    public Option () {
        id = new ObjectId().toString();
    }

}
