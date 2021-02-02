package com.ifood.merchant.endpoint.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
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

    @NotNull(message = "400.003")
    private boolean availability;

    @NotNull(message = "400.003")
    private BigDecimal price;

    private String image;

    private String description;

    private List<Option> options;

    public SKU () {
        id = new ObjectId().toString();
    }
}
