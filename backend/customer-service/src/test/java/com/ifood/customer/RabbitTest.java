package com.ifood.customer;

import com.ifood.customer.endpoint.model.entity.Customer;
import com.ifood.customer.message.producer.MessageProducer;
import com.ifood.customer.message.producer.MessageSource;
import org.junit.jupiter.api.Test;

public class RabbitTest {


    private MessageProducer messageProducer;

    private MessageSource restSource;


    @Test
    public void teste () {

        Customer teste = Customer.builder()
                .name("teste")
                .phone("12354")
                .email("email@email.com")
                .taxPayerIdentificationNumber("12345678912")
                .build();

        messageProducer.sendMessageSaveCustomer(teste, restSource);
    }

}
