package com.ifood.order.endpoint.service;

import com.ifood.order.client.IntegrationClient;
import com.ifood.order.endpoint.error.UnprocessableEntityException;
import com.ifood.order.endpoint.model.Merchant;
import com.ifood.order.endpoint.model.Order;
import com.ifood.order.endpoint.model.request.OrderRequest;
import com.ifood.order.endpoint.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    Logger logger = LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orderRepository;

    private final NextSequenceService nextSequenceService;

    private final IntegrationClient integrationClient;

    public List<Order> listAll(Pageable pageable, String merchantId, String customerId) {
        logger.info("Recuperando da base de dados todos os pedidos...");

        //TODO CRIAR UM OrderResponse
        //TODO PREENCHER O OBJETO MERCHANT COM LOGO E NOME DO MERCHANT
        List<Order> orderRequests = null;

        if (merchantId == null && customerId == null) {
            orderRequests = orderRepository.findAll(pageable)
                    .stream()
                    .collect(Collectors.toList());
        }

        if (merchantId != null) {
            orderRequests = orderRepository.findByIdMerchant(merchantId);
        }

        if (customerId != null) {
            orderRequests = orderRepository.findByIdCustomer(customerId);
        }

        if (merchantId != null && customerId != null ) {
            orderRequests = orderRepository
                    .findByIdMerchantAndIdCustomer(merchantId, customerId);
        }

        return orderRequests;
    }

    public Order save(OrderRequest orderRequest) {
        logger.info("Criando novo pedido na base de dados...");

        //TO DO ver o que aconteceu agora qnd passo um merchant q nao existe
        Merchant merchantById = integrationClient.findMerchantById(orderRequest.getIdMerchant());
        integrationClient.findCustomerById(orderRequest.getIdCustomer());

        Order order = Order.valueOf(orderRequest);

        order.setCode(nextSequenceService.getNextSequence("DatabaseSequence"));
        order.setMerchantLogo(merchantById.getLogo());
        order.setMerchantName(merchantById.getName());

        return orderRepository.save(order);
    }
}