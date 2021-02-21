package com.ifood.order.endpoint.model.request;

import com.ifood.order.endpoint.enumeration.PaymentStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class UpdatePaymentStatusRequest {

    @NotNull(message = "400.003")
    private PaymentStatusEnum paymentStatus;
}
