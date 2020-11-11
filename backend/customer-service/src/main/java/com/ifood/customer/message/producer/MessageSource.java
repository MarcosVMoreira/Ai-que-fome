package com.ifood.customer.message.producer;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;

public interface MessageSource {

    @Output("save-auth-customer")
    MessageChannel sendMessageToSaveCustomerChannel ();

}
