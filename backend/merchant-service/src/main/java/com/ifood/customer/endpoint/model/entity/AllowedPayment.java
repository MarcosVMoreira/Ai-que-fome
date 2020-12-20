package com.ifood.customer.endpoint.model.entity;

import com.ifood.customer.endpoint.enumeration.PaymentEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
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

    @NotNull(message = "400.003")
    private PaymentEnum name;

    @NotNull(message = "400.003")
    private Boolean isAllowed;

    public AllowedPayment () {
        id = new ObjectId().toString();
    }

}
