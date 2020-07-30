package com.customer.endpoint.model.DTO;

import com.customer.endpoint.model.entity.Address;
import lombok.Data;

import java.util.List;

@Data
public class CustomerDTO {

    private String id;

    private String name;

    private String phone;

    private String email;

    private String taxPayerIdentificationNumber;

    private List<Address> addresses;

}
