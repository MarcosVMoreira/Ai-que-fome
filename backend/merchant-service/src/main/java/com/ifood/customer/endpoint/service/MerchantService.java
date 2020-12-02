package com.ifood.customer.endpoint.service;

import com.ifood.customer.endpoint.error.UnprocessableEntityException;
import com.ifood.customer.endpoint.model.entity.Merchant;
import com.ifood.customer.endpoint.repository.MerchantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MerchantService {

    Logger logger = LoggerFactory.getLogger(MerchantService.class);

    private MerchantRepository merchantRepository;

    @Autowired
    public MerchantService(MerchantRepository merchantRepository) {
        this.merchantRepository = merchantRepository;
    }

    public List<Merchant> listAll(Pageable pageable) {
        logger.info("Recuperando da base de dados todos os restaurantes...");
        return merchantRepository.findAll(pageable)
                .stream()
                .collect(Collectors.toList());
    }

    public Merchant save(Merchant merchant) {
        logger.info("Criando novo restaurante na base de dados...");

        Optional<Merchant> foundMerchant =
                merchantRepository.findByDocument(merchant.getDocument());

        if (foundMerchant.isPresent()) {
            logger.info("Documento {} já existe na base de dados.", merchant.getDocument());
            throw new UnprocessableEntityException("422.001");
        }

        return merchantRepository.save(merchant);
    }

}
