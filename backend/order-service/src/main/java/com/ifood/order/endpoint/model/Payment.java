package com.ifood.order.endpoint.model;

import com.ifood.order.endpoint.enumeration.AllowedPaymentEnum;
import com.ifood.order.endpoint.enumeration.PaymentStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@Document
@AllArgsConstructor
@Builder
public class Payment {

    @NotEmpty(message = "400.003")
    private AllowedPaymentEnum paymentName;

    @NotNull(message = "400.003")
    private BigDecimal value;

    @NotNull(message = "400.003")
    private PaymentStatusEnum paymentStatus;
}