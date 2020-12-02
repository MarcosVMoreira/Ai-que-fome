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
public class SKU {

    @Id
    private String id;

    private String name;

    private String description;

    private boolean availability;

    private String schedules;

    private String price;

    private List<Option> options;

}
