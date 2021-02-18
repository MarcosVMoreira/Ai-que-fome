package com.ifood.order.endpoint.controller;

import com.ifood.order.endpoint.model.Order;
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
    public ResponseEntity<Void> save(@Valid @RequestBody Order order,
                                     UriComponentsBuilder componentsBuilder) {
        return ResponseEntity.created(componentsBuilder.path("order/orders/{id}").
                buildAndExpand(orderService.save(order).getId()).toUri()).build();
    }
}