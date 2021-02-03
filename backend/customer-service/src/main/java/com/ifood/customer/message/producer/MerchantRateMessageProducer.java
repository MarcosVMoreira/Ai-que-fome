package com.ifood.customer.message.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ifood.customer.endpoint.model.entity.MerchantRate;
import com.ifood.customer.endpoint.model.entity.MerchantRateAsyncPayload;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class MerchantRateMessageProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private static final String EXCHANGE_NAME = "ifood-exchange";

    public void sendRateDataToRabbit (MerchantRate merchantRate) {
        try {
            MerchantRateAsyncPayload payload = MerchantRateAsyncPayload.builder()
                    .merchantId(merchantRate.getMerchantId())
                    .rate(merchantRate.getRate())
                    .build();
            String json = new ObjectMapper().writeValueAsString(payload);
            rabbitTemplate.convertAndSend(EXCHANGE_NAME, "", json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}