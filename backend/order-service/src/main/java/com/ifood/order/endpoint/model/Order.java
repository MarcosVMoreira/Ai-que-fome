package com.ifood.order.endpoint.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ifood.order.endpoint.enumeration.OrderStatusEnum;
import com.ifood.order.endpoint.enumeration.PaymentStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.List;

@Data
@Document
@AllArgsConstructor
@Builder
public class Order {

    @Id
    private String id;

    @NotEmpty(message = "400.003")
    private String idCustomer;

    @NotEmpty(message = "400.003")
    private String createdAt;

    @NotNull(message = "400.003")
    private Payment payment;

    @NotNull(message = "400.003")
    private List<Item> items;

    @NotNull(message = "400.003")
    private BigDecimal subTotal;

    @NotNull(message = "400.003")
    private BigDecimal totalPrice;

    @NotNull(message = "400.003")
    private BigDecimal deliveryFee;

    @NotEmpty(message = "400.003")
    private String deliveryAddress;

    @NotNull(message = "400.003")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime deliveryDateTime;

    @NotNull(message = "400.003")
    private OrderStatusEnum orderStatus;

}