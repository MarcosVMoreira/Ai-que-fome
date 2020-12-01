package com.ifood.auth.endpoint.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerAsyncPayload {

    private String email;

    private String id;
}
