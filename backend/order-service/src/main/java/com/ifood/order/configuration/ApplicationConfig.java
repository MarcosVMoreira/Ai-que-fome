package com.ifood.order.configuration;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class ApplicationConfig {

    @Value("${security.access-token}")
    private String microserviceAccessToken;

    @Value("${merchant.get.get-by-id}")
    private String merchantFindById;

    @Value("${customer.get.get-by-id}")
    private String customerFindById;

}