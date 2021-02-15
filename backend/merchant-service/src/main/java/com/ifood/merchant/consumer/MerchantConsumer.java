package com.ifood.merchant.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ifood.merchant.endpoint.model.entity.MerchantRateAsyncPayload;
import com.ifood.merchant.endpoint.service.MerchantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MerchantConsumer {

    Logger logger = LoggerFactory.getLogger(MerchantConsumer.class);

    @Autowired
    private MerchantService merchantService;

    @Autowired
    private ObjectMapper objectMapper;

    @RabbitListener(queues = MerchantAMQPConfig.QUEUE)
    public void consumer(Message message) throws JsonProcessingException {

        String userInfoJson = new String(message.getBody());

        MerchantRateAsyncPayload asyncPayload
                = objectMapper.readValue(userInfoJson, MerchantRateAsyncPayload.class);

        try {
            merchantService.saveRate(asyncPayload.getMerchantId(), asyncPayload.getRate());
        } catch (Exception e) {
            logger.info("Houve problema ao persistir o rate no documento merchant.", e);
        }
    }
}