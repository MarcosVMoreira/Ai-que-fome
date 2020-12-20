package com.ifood.customer.endpoint.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import java.math.BigDecimal;
import java.util.List;

@Data
@Document
@AllArgsConstructor
@Builder
public class SKU {

    @Id
    private String id;

    @NotEmpty(message = "400.003")
    private String name;

    @NotEmpty(message = "400.003")
    private boolean availability;

    @NotEmpty(message = "400.003")
    private BigDecimal price;

    private String description;

    private List<Option> options;

}
