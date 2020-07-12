package com.customer.customer.message.consumer;

import com.customer.customer.endpoint.entity.Address;
import com.customer.customer.endpoint.entity.Customer;
import com.customer.customer.endpoint.service.AddressService;
import com.customer.customer.endpoint.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.messaging.Message;

@EnableBinding(MessageSink.class)
public class MessageSinkImpl {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AddressService addressService;


    @StreamListener(target = "input-save-customer")
    public void receiveMessageToSaveCustomer (Message<Customer> customerPayload) {
        customerService.saveInput(customerPayload.getPayload());
    }

    @StreamListener(target = "input-update-customer")
    public void receiveMessageToUpdateCustomer (Message<Customer> customerPayload) {
        customerService.updateInput(customerPayload.getPayload());
    }

    @StreamListener(target = "input-delete-customer")
    public void receiveMessageToDeleteCustomer (Long id) {
       // customerService.deleteInput(id);
    }

    @StreamListener(target = "input-save-address")
    public void receiveMessageToSaveAddress (Message<Address> addressPayload) {
        addressService.saveInput(addressPayload.getPayload());
    }

    @StreamListener(target = "input-update-address")
    public void receiveMessageToUpdateAddress (Message<Address> addressPayload) {
        addressService.updateInput(addressPayload.getPayload());
    }

    @StreamListener(target = "input-delete-address")
    public void receiveMessageToDeleteAddress (Long id) {
       // addressService.deleteInput(id);
    }

}
