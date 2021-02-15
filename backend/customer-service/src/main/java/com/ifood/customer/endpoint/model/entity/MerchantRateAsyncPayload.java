package com.ifood.customer.endpoint.model.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MerchantRateAsyncPayload {

    private String merchantId;

    private Float rate;
}
