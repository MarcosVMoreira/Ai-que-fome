package com.ifood.customer.endpoint.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Document
@AllArgsConstructor
@Builder
public class Category {

    @Id
    private String id;

    @NotNull(message = "400.003")
    private boolean availability;

    @NotEmpty(message = "400.003")
    private String name;

    private List<SKU> skus;

    public Category () {
        id = new ObjectId().toString();
    }
}
