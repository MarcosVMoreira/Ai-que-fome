package com.ifood.customer.message.consumer;

import com.ifood.customer.endpoint.model.entity.Customer;
import com.ifood.customer.endpoint.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.messaging.Message;

@EnableBinding(MessageSink.class)
public class MessageSinkImpl {

    @Autowired
    private CustomerService customerService;

    @StreamListener(target = "save-auth-customer")
    public void receiveMessageToSaveCustomer (Message<Customer> customerPayload) {
        //customerService.saveInput(customerPayload.getPayload());
        System.out.println("recebido: "+customerPayload.getPayload());
    }
}
