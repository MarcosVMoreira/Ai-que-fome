package com.ifood.order.endpoint.service;

import com.ifood.order.client.IntegrationClient;
import com.ifood.order.endpoint.enumeration.OrderStatusEnum;
import com.ifood.order.endpoint.enumeration.PaymentStatusEnum;
import com.ifood.order.endpoint.error.NotFoundException;
import com.ifood.order.endpoint.error.UnprocessableEntityException;
import com.ifood.order.endpoint.model.Customer;
import com.ifood.order.endpoint.model.Merchant;
import com.ifood.order.endpoint.model.Order;
import com.ifood.order.endpoint.model.request.OrderRequest;
import com.ifood.order.endpoint.model.request.UpdateOrderStatusRequest;
import com.ifood.order.endpoint.model.request.UpdatePaymentStatusRequest;
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
        Customer customerById = integrationClient.findCustomerById(orderRequest.getIdCustomer());

        Order order = Order.valueOf(orderRequest);

        order.setCode(nextSequenceService.getNextSequence("DatabaseSequence"));
        order.setMerchantLogo(merchantById.getLogo());
        order.setMerchantName(merchantById.getName());

        order.setCustomerName(customerById.getName());

        return orderRepository.save(order);
    }

    public Order getOrderById(String id) {
        logger.info("Recuperando da base de dados a ordem com o id {}", id);

        return orderRepository.findById(id)
                .orElseThrow(NotFoundException::new);
    }

    public Order updatePaymentStatus (String orderId, UpdatePaymentStatusRequest request) {
        logger.info("Buscando ordem na base de dados com base no id {}", orderId);

        Order order = orderRepository.findById(orderId)
                .orElseThrow(NotFoundException::new);

        logger.info("Atualizando status do pagamento da ordem...");

        order.getPayment().setPaymentStatus(request.getPaymentStatus());

        return orderRepository.save(order);
    }

    public Order updateOrderStatus (String orderId, UpdateOrderStatusRequest request) {
        logger.info("Buscando ordem na base de dados com base no id {}", orderId);

        Order order = orderRepository.findById(orderId)
                .orElseThrow(NotFoundException::new);

        logger.info("Atualizando status da ordem...");

        order.setOrderStatus(request.getOrderStatus());

        return orderRepository.save(order);
    }
}