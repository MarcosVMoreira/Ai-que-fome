package com.ifood.customer.message.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

@Component
public class CustomerConsumer {

    @RabbitListener(queues = CustomerAMQPConfig.QUEUE)
    public void consumer (Message message) {
        //TODO fazer req para
    }

}
