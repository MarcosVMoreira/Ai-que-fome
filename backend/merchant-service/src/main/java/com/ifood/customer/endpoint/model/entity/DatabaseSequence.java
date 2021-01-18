package com.ifood.customer.endpoint.repository;

import org.springframework.data.annotation.Id;

public class DatabaseSequence {

    @Id
    private String id;

    private long seq;

}