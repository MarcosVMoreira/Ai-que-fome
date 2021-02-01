package com.ifood.merchant.message.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ifood.merchant.endpoint.model.dto.CustomerDTO;
import com.ifood.merchant.endpoint.model.entity.CustomerAsyncPayload;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class CustomerMessageProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private static final String EXCHANGE_NAME = "user-created";

    public void sendCustomerDataToRabbit (CustomerDTO customer) {
        try {
            CustomerAsyncPayload payload = CustomerAsyncPayload.builder()
                    .email(customer.getEmail())
                    .id(customer.getId())
                    .build();
            String json = new ObjectMapper().writeValueAsString(payload);
            rabbitTemplate.convertAndSend(EXCHANGE_NAME, "", json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

}
