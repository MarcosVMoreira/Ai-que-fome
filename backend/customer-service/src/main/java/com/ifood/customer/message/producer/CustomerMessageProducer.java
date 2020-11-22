package com.ifood.customer.message.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ifood.customer.endpoint.model.entity.Customer;
import com.ifood.customer.message.consumer.CustomerAMQPConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class CustomerMessageProducer {

    private final RabbitTemplate rabbitTemplate;

    public void sendCustomerDataToRabbit (Customer customer) {
        try {
            String json = new ObjectMapper().writeValueAsString(customer);
            rabbitTemplate.convertAndSend(CustomerAMQPConfig.EXCHANGE_NAME, "", json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

}
