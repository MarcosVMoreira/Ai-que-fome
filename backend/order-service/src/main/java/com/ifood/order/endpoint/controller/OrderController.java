package com.ifood.order.endpoint.controller;

import com.ifood.order.endpoint.enumeration.OrderStatusEnum;
import com.ifood.order.endpoint.enumeration.PaymentStatusEnum;
import com.ifood.order.endpoint.model.Order;
import com.ifood.order.endpoint.model.Payment;
import com.ifood.order.endpoint.model.request.OrderRequest;
import com.ifood.order.endpoint.model.request.UpdateOrderStatusRequest;
import com.ifood.order.endpoint.model.request.UpdatePaymentStatusRequest;
import com.ifood.order.endpoint.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.util.List;

@RestController
@Validated
@RequestMapping("orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<Order> listAll(Pageable pageable,
                               @RequestParam(required = false) String merchantId,
                               @RequestParam(required = false) String customerId) {
        return new PageImpl<>(orderService.listAll(pageable, merchantId, customerId));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> save(@Valid @RequestBody OrderRequest orderRequest,
                                     UriComponentsBuilder componentsBuilder) {
        return ResponseEntity.created(componentsBuilder.path("order/orderRequests/{id}").
                buildAndExpand(orderService.save(orderRequest).getId()).toUri()).build();
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public Order getOrderById(@PathVariable String id) {
        return orderService.getOrderById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/{orderId}/payment-status")
    public Order updatePaymentStatus(@PathVariable String orderId,
                                       @Valid @RequestBody UpdatePaymentStatusRequest updatePaymentStatusRequest) {
        return orderService.updatePaymentStatus(orderId, updatePaymentStatusRequest);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/{orderId}/order-status")
    public Order updateOrderStatus(@PathVariable String orderId,
                                   @Valid @RequestBody UpdateOrderStatusRequest updateOrderStatusRequest) {
        return orderService.updateOrderStatus(orderId, updateOrderStatusRequest);
    }
}