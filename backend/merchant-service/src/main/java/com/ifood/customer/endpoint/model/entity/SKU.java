package com.ifood.customer.endpoint.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
@Document
@AllArgsConstructor
@Builder
public class SKU {

    @Id
    private String id;

    @NotEmpty(message = "The field 'name' is mandatory")
    private String name;

    @NotEmpty(message = "The field 'availability' is mandatory")
    private boolean availability;

    @NotEmpty(message = "The field 'price' is mandatory")
    private String price;

    private String description;

    private String schedules;

    private List<Option> options;

}
