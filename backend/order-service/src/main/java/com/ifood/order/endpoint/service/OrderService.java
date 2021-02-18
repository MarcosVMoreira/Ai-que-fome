package com.ifood.order.endpoint.service;

import com.ifood.order.client.IntegrationClient;
import com.ifood.order.endpoint.error.UnprocessableEntityException;
import com.ifood.order.endpoint.model.Order;
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
        List<Order> orders = null;

        if (merchantId == null && customerId == null) {
            orders = orderRepository.findAll(pageable)
                    .stream()
                    .collect(Collectors.toList());
        }

        if (merchantId != null) {
            orders = orderRepository.findByIdMerchant(merchantId);
        }

        if (customerId != null) {
            orders = orderRepository.findByIdCustomer(customerId);
        }

        if (merchantId != null && customerId != null ) {
            orders = orderRepository
                    .findByIdMerchantAndIdCustomer(merchantId, customerId);
        }

        return orders;
    }

    public Order save(Order order) {
        logger.info("Criando novo pedido na base de dados...");

        boolean merchantExist = integrationClient.findMerchantById(order.getIdMerchant());
        boolean customerExist = integrationClient.findCustomerById(order.getIdCustomer());

        if (!merchantExist || !customerExist) {
            throw new UnprocessableEntityException("422.001");
        }

        order.setCode(nextSequenceService.getNextSequence("DatabaseSequence"));

        return orderRepository.save(order);
    }
}