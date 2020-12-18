package com.ifood.customer.endpoint.model.entity;

import com.ifood.customer.endpoint.enumeration.PaymentEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Document
@AllArgsConstructor
@Builder
public class AllowedPayment {

    @Id
    private String id;

    @NotEmpty(message = "The field 'name' is mandatory")
    private PaymentEnum name;

    @NotNull(message = "The field 'isAllowed' is mandatory")
    private boolean isAllowed;

}
