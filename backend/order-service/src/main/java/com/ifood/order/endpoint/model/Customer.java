package com.ifood.order.endpoint.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
@Document
@AllArgsConstructor
@Builder
public class Customer {

    private String id;

    private String name;

    private String phone;

    private String email;

    private String taxPayerIdentificationNumber;

    private List<Address> addresses;
}