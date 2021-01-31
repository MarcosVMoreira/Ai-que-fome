package com.ifood.customer.endpoint.model.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Data
@Document
@AllArgsConstructor
@Builder
public class MerchantRate {

    @NotBlank(message = "The field 'merchantId' is mandatory")
    public String merchantId;

    @NotEmpty(message = "The field 'rate' is mandatory")
    public Float rate;
}