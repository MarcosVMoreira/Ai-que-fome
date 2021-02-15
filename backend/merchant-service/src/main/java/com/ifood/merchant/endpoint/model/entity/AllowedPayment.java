package com.ifood.merchant.endpoint.model.entity;

import com.ifood.merchant.endpoint.enumeration.AllowedPaymentEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

@Data
@Document
@AllArgsConstructor
@Builder
public class AllowedPayment {

    @Id
    private String id;

    @NotNull(message = "400.003")
    private AllowedPaymentEnum name;

    @NotNull(message = "400.003")
    private Boolean isAllowed;

    public AllowedPayment () {
        id = new ObjectId().toString();
    }

}
