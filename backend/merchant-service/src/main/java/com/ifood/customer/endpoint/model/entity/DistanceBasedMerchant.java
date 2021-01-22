package com.ifood.customer.endpoint.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;

@Data
@Document
@AllArgsConstructor
@Builder
public class DistanceBasedMerchant {

    private String merchantId;

    private BigInteger distance;

    private BigInteger fee;

    private BigInteger deliveryType;
}