package com.ifood.token.security.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApplicationUser {

    @Id
    private String id;

    @NotEmpty(message = "The field 'email' is mandatory")
    @Email(message = "The email must be valid")
    @Indexed(unique=true)
    private String email;

    @NotEmpty(message = "The field 'role' is mandatory")
    @Builder.Default
    private String role = "USER";

    @NotEmpty(message = "The field 'customerId' is mandatory")
    private String customerId;

    @NotEmpty(message =  "The field 'loginCode' is mandatory")
    @ToString.Exclude
    private String loginCode;

    public ApplicationUser (@NotNull ApplicationUser applicationUser) {
        this.id = applicationUser.getId();
        this.email = applicationUser.getEmail();
        this.role = applicationUser.getRole();
        this.customerId = applicationUser.getCustomerId();
        this.loginCode = applicationUser.getLoginCode();
    }



}

