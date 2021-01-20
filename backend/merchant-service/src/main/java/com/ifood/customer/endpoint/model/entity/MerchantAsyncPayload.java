package com.ifood.customer.endpoint.model.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MerchantAsyncPayload {

    private String email;

    private String id;
}
