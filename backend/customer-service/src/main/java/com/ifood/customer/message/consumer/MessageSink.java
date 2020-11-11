package com.ifood.customer.message.consumer;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

public interface MessageSink {

    @Input("save-auth-customer")
    SubscribableChannel receiveMessageToSaveCustomer ();

}
