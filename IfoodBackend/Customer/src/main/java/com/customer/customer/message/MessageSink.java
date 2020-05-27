package com.customer.customer.message;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

public interface MessageSink {

    @Input("input-save-customer")
    SubscribableChannel receiveMessageToSaveCustomer ();

    @Input("input-update-customer")
    SubscribableChannel receiveMessageToUpdateCustomer ();

    @Input("input-delete-customer")
    SubscribableChannel receiveMessageToDeleteCustomer ();

}
