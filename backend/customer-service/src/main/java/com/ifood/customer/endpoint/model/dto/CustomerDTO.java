package com.ifood.customer.endpoint.model.dto;

import com.ifood.customer.endpoint.model.entity.Address;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class CustomerDTO {

    private String id;

    @NotEmpty(message = "422.002")
    private String name;

    @NotEmpty(message = "422.002")
    private String phone;

    @NotEmpty(message = "422.002")
    @Email(message = "422.003")
    private String email;

    @NotEmpty(message = "422.002")
    private String taxPayerIdentificationNumber;

    @NotEmpty(message = "422.002")
    private List<Address> addresses;

}