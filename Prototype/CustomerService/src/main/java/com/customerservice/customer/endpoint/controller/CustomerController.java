package com.customerservice.customer.endpoint.controller;

import com.customerservice.customer.endpoint.model.Customer;
import com.customerservice.customer.endpoint.service.CustomerServiceImpl;
import com.customerservice.customer.message.RestProducer;
import com.customerservice.customer.message.RestSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class CustomerController {

    @Autowired
    private CustomerServiceImpl customerService;

    @Autowired
    private RestSource restSource;

    @Autowired
    private RestProducer restProducer;

    @GetMapping("/customers")
    public ResponseEntity<?> listAll () {

        Customer customer = new Customer(1L, "joao", "1234", "email@gmail.com");

        boolean result = restProducer.sendMessageCustomer(customer, restSource);

        if(result)
            System.out.println("Funcionou");

        return new ResponseEntity<>(customerService.listAll(), HttpStatus.OK);

    }

}
