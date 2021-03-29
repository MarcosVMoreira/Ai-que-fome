package com.ifood.order.endpoint.model;

import com.ifood.order.endpoint.enumeration.OrderStatusEnum;
import com.ifood.order.endpoint.model.request.OrderRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.validation.annotation.Validated;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.List;

@Data
@Document
@AllArgsConstructor
@Builder
@Validated
public class Order {
    @Id
    private String id;

    private long code;

    private String idCustomer;

    private String customerName;

    private String idMerchant;

    private String merchantLogo;

    private String merchantName;

    private LocalTime createdAt;

    private Payment payment;

    private List<Item> items;

    private BigDecimal subTotal;

    private BigDecimal totalPrice;

    private BigDecimal deliveryFee;

    private Address deliveryAddress;

    private LocalTime deliveryDateTime;

    private OrderStatusEnum orderStatus;

    public static Order valueOf(OrderRequest orderRequest) {
        return Order.builder()
            .idCustomer(orderRequest.getIdCustomer())
            .idMerchant(orderRequest.getIdMerchant())
            .createdAt(orderRequest.getCreatedAt())
            .payment(orderRequest.getPayment())
            .items(orderRequest.getItems())
            .subTotal(orderRequest.getSubTotal())
            .totalPrice(orderRequest.getTotalPrice())
            .deliveryFee(orderRequest.getDeliveryFee())
            .deliveryAddress(orderRequest.getDeliveryAddress())
            .deliveryDateTime(orderRequest.getDeliveryDateTime())
            .orderStatus(orderRequest.getOrderStatus())
            .build();
    }
}