package com.ifood.customer.endpoint.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
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

    @NotEmpty(message = "The field 'name' is mandatory")
    private String name;

    @NotEmpty(message = "The field 'minQuantity' is mandatory")
    private Integer minQuantity;

    @NotEmpty(message = "The field 'maxQuantity' is mandatory")
    private Integer maxQuantity;

    @NotEmpty(message = "The field 'price' is mandatory")
    private BigDecimal price;

}
