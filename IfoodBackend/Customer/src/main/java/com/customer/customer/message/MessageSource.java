package com.customer.customer.message;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;

public interface MessageSource {

    @Output("output-save-customer")
    MessageChannel sendMessageToSaveCustomerChannel();

    @Output("output-update-customer")
    MessageChannel sendMessageToUpdateCustomerChannel();

    @Output("output-delete-customer")
    MessageChannel sendMessageToDeleteCustomerChannel();

}
