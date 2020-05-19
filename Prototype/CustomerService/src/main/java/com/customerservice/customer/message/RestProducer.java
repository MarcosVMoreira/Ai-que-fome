package com.customerservice.customer.message;

import com.customerservice.customer.endpoint.model.Customer;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;

@Component
public class RestProducer {

    public boolean sendMessageCustomer (Customer payload, RestSource restSource) {
        Message<Customer> message = MessageBuilder.withPayload(payload).build();
        return restSource.sendMessage().send(message);
    }

}
