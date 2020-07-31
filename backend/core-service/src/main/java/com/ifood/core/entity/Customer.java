package com.ifood.core.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
public class Customer {

    @Id
    private String id;

    @NotEmpty(message = "The field 'name' is mandatory")
    private String name;

    @NotEmpty(message = "The field 'phone' is mandatory")
    @Size(max = 11, message = "Wrong size for field 'phone'")
    private String phone;

    @NotEmpty(message = "The field 'email' is mandatory")
    @Email(message = "The email must be valid")
    private String email;

    @NotEmpty(message = "The field 'taxPayerIdentificationNumber' is mandatory")
    private String taxPayerIdentificationNumber;

    @Valid
    private List<Address> addresses;

    public Customer (@NotEmpty(message = "The field 'name' is mandatory") String name,
                     @NotEmpty(message = "The field 'cellphone' is mandatory") @Size(max = 11) String phone,
                     @NotEmpty(message = "The field 'email' is mandatory") @Email(message = "The email must be valid") String email,
                     @NotEmpty(message = "The field 'taxPayerIdentificationNumber' is mandatory") String taxPayerIdentificationNumber,
                     @Valid List<Address> addresses) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.taxPayerIdentificationNumber = taxPayerIdentificationNumber;
        this.addresses = addresses;
    }
}
