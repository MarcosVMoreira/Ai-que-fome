package com.ifood.order.endpoint.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;

@Data
@Document
@AllArgsConstructor
@Builder
public class Merchant {

    @NotEmpty(message = "400.003")
    private String idMerchant;

    @NotEmpty(message = "400.003")
    private String logo;

    @NotEmpty(message = "400.003")
    private String nome;

}