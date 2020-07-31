package com.ifood.customer.message.producer;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;

public interface MessageSource {

    @Output("output-save-customer")
    MessageChannel sendMessageToSaveCustomerChannel ();

    @Output("output-update-customer")
    MessageChannel sendMessageToUpdateCustomerChannel ();

    @Output("output-delete-customer")
    MessageChannel sendMessageToDeleteCustomerChannel ();

    @Output("output-save-address")
    MessageChannel sendMessageToSaveAddressChannel ();

    @Output("output-update-address")
    MessageChannel sendMessageToUpdateAddressChannel ();

    @Output("output-delete-address")
    MessageChannel sendMessageToDeleteAddressChannel ();

}
