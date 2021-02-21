package com.ifood.order.endpoint.model.request;

import com.ifood.order.endpoint.enumeration.OrderStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class UpdateOrderStatusRequest {

    @NotNull(message = "400.003")
    private OrderStatusEnum orderStatus;
}
