package com.customer.customer.endpoint.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="CustomerID")
    private Long id;

    @NotEmpty(message = "The field 'name' is mandatory")
    @Column(nullable = false, name="Name")
    private String name;

    @NotEmpty(message = "The field 'cellphone' is mandatory")
    @Column(nullable = false, name="Cellphone")
    @Size(max = 11)
    private String cellphone;

    @NotEmpty(message = "The field 'email' is mandatory")
    @Column(nullable = false, name="Email")
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
