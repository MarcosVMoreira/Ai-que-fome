package com.customer.customer.message;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.cloud.stream.messaging.Source;
import org.springframework.messaging.MessageChannel;

public interface MessageSource {

    @Output("input-save-customer")
    public MessageChannel sendMessageToSaveCustomerChannel();

    @Output("input-update-customer")
    public MessageChannel sendMessageToUpdateCustomerChannel();

    @Output("input-delete-customer")
    public MessageChannel sendMessageToDeleteCustomerChannel();

}
