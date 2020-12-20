package com.ifood.customer.endpoint.service;

import com.ifood.customer.endpoint.error.BadRequestException;
import com.ifood.customer.endpoint.error.NotFoundException;
import com.ifood.customer.endpoint.error.UnprocessableEntityException;
import com.ifood.customer.endpoint.model.entity.AllowedPayment;
import com.ifood.customer.endpoint.model.entity.Merchant;
import com.ifood.customer.endpoint.repository.MerchantRepository;
import com.ifood.customer.producer.MerchantMessageProducer;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MerchantService {

    Logger logger = LoggerFactory.getLogger(MerchantService.class);

    private final MerchantRepository merchantRepository;

    private final MerchantMessageProducer messageProducer;

    public List<Merchant> listAll(Pageable pageable) {
        logger.info("Recuperando da base de dados todos os restaurantes...");
        return merchantRepository.findAll(pageable)
                .stream()
                .collect(Collectors.toList());
    }

    public Merchant save(Merchant merchant) {
        logger.info("Criando novo restaurante na base de dados...");

        Optional<Merchant> foundMerchantByDocument =
                merchantRepository.findByDocument(merchant.getDocument());

        Optional<Merchant> foundMerchantByEmail =
                merchantRepository.findByEmail(merchant.getEmail());

        if (foundMerchantByDocument.isPresent()) {
            logger.info("Documento {} já existe na base de dados.", merchant.getDocument());
            throw new UnprocessableEntityException("422.001");
        }

        if (foundMerchantByEmail.isPresent()) {
            logger.info("Email {} já existe na base de dados.", merchant.getDocument());
            throw new UnprocessableEntityException("422.002");
        }

        Merchant savedMerchant = merchantRepository.save(merchant);

        messageProducer.sendMerchantDataToRabbit(savedMerchant);

        return savedMerchant;
    }

    public Merchant getMerchantById(String id) {
        logger.info("Recuperando da base de dados todos registros utilizando o id {}", id);
        return merchantRepository.findById(id)
                .orElseThrow(NotFoundException::new);
    }

    public Merchant getMerchantByEmail(String email) {
        logger.info("Recuperando da base de dados todos registros utilizando o email {}", email);
        return merchantRepository.findByEmail(email)
                .orElseThrow(NotFoundException::new);
    }

    public void delete(String id) {
        Optional<Merchant> entity = merchantRepository.findById(id);

        if (entity.isPresent()) {
            merchantRepository.deleteById(id);
        }
    }

    public Merchant update(Merchant merchant, String id) {

        if (!Optional.ofNullable(merchant.getDocument()).isPresent() ||
                merchant.getDocument().isEmpty()) {
            throw new BadRequestException("400.002");
        }
        Optional<Merchant> verifyingDocument =
                merchantRepository.findByDocument(merchant.getDocument());
        if (verifyingDocument.isPresent() && !verifyingDocument.get().getId().equals(id)) {
            throw new UnprocessableEntityException("422.001");
        }
        merchant.setId(id);

        return merchantRepository.save(merchant);
    }

    /* AllowedPayments */

    public List<String> saveAllowedPayment(String merchantId, @Valid AllowedPayment receivedAllowedPayment) {
        List<String> list = new ArrayList<>();
        Optional<Merchant> merchant = merchantRepository.findById(merchantId);

        if (!merchant.isPresent()) {
            throw new NotFoundException();
        }
        if (!merchant.get().getAllowedPayments().isEmpty() &&
            merchant.get().getAllowedPayments()
                    .stream()
                    .anyMatch(allowedPayment -> receivedAllowedPayment.getName().equals(allowedPayment.getName()))) {
            throw new UnprocessableEntityException("422.003");
        }
        receivedAllowedPayment.setId(new AllowedPayment().getId());
        Optional.ofNullable(merchant.get().getAllowedPayments())
                .ifPresent(a -> a.add(receivedAllowedPayment));
        if (!Optional.ofNullable(merchant.get().getAllowedPayments()).isPresent()) {
            merchant.get()
                    .setAllowedPayments(Collections.singletonList(receivedAllowedPayment));
        }
        merchantRepository.save(merchant.get());
        list.add(merchant.get().getId());
        list.add(receivedAllowedPayment.getId());

        return list;
    }

    public AllowedPayment getAllowedPaymentById(String idMerchant, String idAllowedPayment) {
        Optional<Merchant> merchant = merchantRepository.findById(idMerchant);

        if (!merchant.isPresent()) {
            throw new NotFoundException();
        }

        return merchant.get().getAllowedPayments().stream()
                .filter(a -> idAllowedPayment.equals(a.getId()))
                .findAny()
                .orElseThrow(NotFoundException::new);
    }

    public Merchant updateAllowedPayment (String merchantId, String allowedPaymentId, @Valid AllowedPayment allowedPayment) {
        Optional<Merchant> merchant = merchantRepository.findById(merchantId);

        if (!merchant.isPresent()) {
            throw new NotFoundException();
        }
        if (!merchant.get().getAllowedPayments().isEmpty() &&
                merchant.get().getAllowedPayments()
                        .stream()
                        .anyMatch(a -> allowedPayment.getName().equals(a.getName()))) {
            throw new UnprocessableEntityException("422.003");
        }
        merchant.get().getAllowedPayments().stream()
                .filter(a -> allowedPaymentId.equals(a.getId()))
                .findAny()
                .orElseThrow(NotFoundException::new);
        allowedPayment.setId(allowedPaymentId);
        List<AllowedPayment> addresses = merchant.get().getAllowedPayments();
        addresses.removeIf(a -> a.getId().equals(allowedPaymentId));
        addresses.add(allowedPayment);
        merchant.get().setAllowedPayments(addresses);

        return merchantRepository.save(merchant.get());
    }

    public void deleteAllowedPayment (String idMerchant, String idAllowedPayment) {
        Optional<Merchant> merchant = merchantRepository.findById(idMerchant);

        if (!merchant.isPresent()) {
            throw new NotFoundException();
        }
        List<AllowedPayment> allowedPayments = merchant.get().getAllowedPayments();
        if (!allowedPayments.isEmpty()) {
            allowedPayments.removeIf(a -> a.getId().equals(idAllowedPayment));
            merchant.get().setAllowedPayments(allowedPayments);
            merchantRepository.save(merchant.get());
        }
    }
}