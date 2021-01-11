package com.ifood.order.endpoint.model;

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
public class Item {

    @NotEmpty(message = "400.003")
    private String name;

    @NotNull(message = "400.003")
    private int quantity;

    @NotNull(message = "400.003")
    private BigDecimal totalPrice;

    @NotNull(message = "400.003")
    private BigDecimal discount;

    @NotEmpty(message = "400.003")
    private String comment;



}
