package com.ifood.auth.message.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ifood.auth.endpoint.controller.UserInfoController;
import com.ifood.auth.endpoint.model.CustomerAsyncPayload;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CustomerConsumer {

    @Autowired
    private UserInfoController userInfoController;

    @Autowired
    private ObjectMapper objectMapper;

    @RabbitListener(queues = CustomerAMQPConfig.QUEUE)
    public void consumer(Message message) throws JsonProcessingException {

        String userInfoJson = new String(message.getBody());

        CustomerAsyncPayload asyncPayload
                = objectMapper.readValue(userInfoJson, CustomerAsyncPayload.class);

        userInfoController.save(asyncPayload.getEmail(), asyncPayload.getId());

    }

}
