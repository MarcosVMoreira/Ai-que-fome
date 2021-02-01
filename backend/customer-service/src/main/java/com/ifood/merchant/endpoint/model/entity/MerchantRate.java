package com.ifood.merchant.endpoint.model.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Document
@AllArgsConstructor
@Builder
public class MerchantRate {

    private String id;

    @NotBlank(message = "The field 'merchantId' is mandatory")
    public String merchantId;

    @NotNull(message = "The field 'rate' is mandatory")
    public Float rate;

    public MerchantRate () {
        id = new ObjectId().toString();
    }
}