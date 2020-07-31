//package com.ifood.customer.customer.message.consumer;
//
//import com.ifood.customer.customer.endpoint.service.AddressService;
//import com.ifood.customer.customer.endpoint.service.CustomerService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.cloud.stream.annotation.EnableBinding;
//
//@EnableBinding(MessageSink.class)
//public class MessageSinkImpl {
//
//    @Autowired
//    private CustomerService customerService;
//
////
////
////    @StreamListener(target = "input-save-customer")
////    public void receiveMessageToSaveCustomer (Message<Customer> customerPayload) {
////        customerService.saveInput(customerPayload.getPayload());
////    }
////
////    @StreamListener(target = "input-update-customer")
////    public void receiveMessageToUpdateCustomer (Message<Customer> customerPayload) {
////        customerService.updateInput(customerPayload.getPayload());
////    }
////
////    @StreamListener(target = "input-delete-customer")
////    public void receiveMessageToDeleteCustomer (Long id) {
////       // customerService.deleteInput(id);
////    }
////
////    @StreamListener(target = "input-save-address")
////    public void receiveMessageToSaveAddress (Message<Address> addressPayload) {
////        addressService.saveInput(addressPayload.getPayload());
////    }
////
////    @StreamListener(target = "input-update-address")
////    public void receiveMessageToUpdateAddress (Message<Address> addressPayload) {
////        addressService.updateInput(addressPayload.getPayload());
////    }
////
////    @StreamListener(target = "input-delete-address")
////    public void receiveMessageToDeleteAddress (Long id) {
////       // addressService.deleteInput(id);
////    }
//
//}
