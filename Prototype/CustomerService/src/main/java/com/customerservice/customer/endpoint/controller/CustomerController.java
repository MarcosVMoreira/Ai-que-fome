package com.customerservice.customer.endpoint.controller;

import com.customerservice.customer.endpoint.service.CustomerServiceImpl;
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

    @GetMapping("/customers")
    public ResponseEntity<?> listAll () {

        return new ResponseEntity<>(customerService.listAll(), HttpStatus.OK);

    }

}
