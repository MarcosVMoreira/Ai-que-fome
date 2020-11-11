package com.ifood.customer.message.producer;


import com.ifood.customer.endpoint.model.entity.Customer;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;

@Component
public class MessageProducer {

    public boolean sendMessageSaveCustomer (Customer payload, MessageSource restSource) {
        Message<Customer> message = MessageBuilder.withPayload(payload).build();
        return restSource.sendMessageToSaveCustomerChannel().send(message);
    }

}
