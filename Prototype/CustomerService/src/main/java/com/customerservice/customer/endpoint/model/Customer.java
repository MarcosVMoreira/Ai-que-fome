package com.customerservice.customer.endpoint.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ctm_id")
    private Long id;

    @NotNull(message = "The field 'name' is mandatory")
    @Column(nullable = false, name="ctm_name")
    private String name;

    @NotNull(message = "The field 'cellphone' is mandatory")
    @Column(nullable = false, name="ctm_cellphone")
    private String cellphone;

    @NotNull(message = "The field 'email' is mandatory")
    @Column(nullable = false, name="ctm_email")
    @Email
    private String email;

}
