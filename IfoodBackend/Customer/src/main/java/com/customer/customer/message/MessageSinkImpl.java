package com.customer.customer.message;

import com.customer.customer.endpoint.DTO.Customer;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.messaging.Message;

@EnableBinding(MessageSink.class)
public class MessageSinkImpl {

    @StreamListener(target = "input-save-customer")
    public void receiveMessageToSaveCustomer (Message<Customer> customer) {
        String status = String.valueOf(customer
                        .getPayload());
        //do something with received message
    }

    @StreamListener(target = "input-update-customer")
    public void receiveMessageToUpdateCustomer (Message<Customer> customer) {
        String status = String.valueOf(customer
                .getPayload());
        //do something with received message

    }

    @StreamListener(target = "input-delete-customer")
    public void receiveMessageToDeleteCustomer (Long id) {

        //do something with received message

    }

}
