package com.ifood.merchant.message.producer;

import org.springframework.amqp.core.Exchange;
import org.springframework.amqp.core.ExchangeBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ExchangeFactory {

    public static String EXCHANGE_NAME = "user-created";

    public static String RATE_EXCHANGE_NAME = "merchant-rated";

    @Bean
    public Exchange declareExchange () {
        return ExchangeBuilder.directExchange(EXCHANGE_NAME)
                .durable(true)
                .build();
    }

    @Bean
    public Exchange declareRateExchange () {
        return ExchangeBuilder.directExchange(RATE_EXCHANGE_NAME)
                .durable(true)
                .build();
    }
}