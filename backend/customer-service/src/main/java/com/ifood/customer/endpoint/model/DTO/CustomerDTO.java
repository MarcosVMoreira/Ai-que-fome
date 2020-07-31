package com.ifood.customer.endpoint.model.DTO;

import com.ifood.core.entity.Address;
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
