package com.customer.customer.endpoint.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
public class Customer {

    @Id
    private String id;

    @NotEmpty(message = "The field 'name' is mandatory")
    private String name;

    @NotEmpty(message = "The field 'cellphone' is mandatory")
    @Size(max = 11)
    private String cellphone;

    @NotEmpty(message = "The field 'email' is mandatory")
    @Email(message = "The email must be valid")
    private String email;

    public Customer (@NotEmpty(message = "The field 'name' is mandatory") String name,
                     @NotNull(message = "The field 'cellphone' is mandatory") @Size(max = 11) String cellphone,
                     @NotNull(message = "The field 'email' is mandatory") @Email String email) {
        this.name = name;
        this.cellphone = cellphone;
        this.email = email;
    }
}
