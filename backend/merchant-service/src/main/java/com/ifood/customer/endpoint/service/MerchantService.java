package com.ifood.customer.endpoint.service;

import com.ifood.customer.endpoint.error.BadRequestException;
import com.ifood.customer.endpoint.error.NotFoundException;
import com.ifood.customer.endpoint.error.UnprocessableEntityException;
import com.ifood.customer.endpoint.model.entity.Merchant;
import com.ifood.customer.endpoint.repository.MerchantRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MerchantService {

    Logger logger = LoggerFactory.getLogger(MerchantService.class);

    private final MerchantRepository merchantRepository;

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

    public Merchant getMerchantById (String id) {
        logger.info("Recuperando da base de dados todos registros utilizando o id {}", id);
        return merchantRepository.findById(id)
                .orElseThrow(NotFoundException::new);
    }

    public void delete (String id) {
        Optional<Merchant> entity = merchantRepository.findById(id);

        if (entity.isPresent()) {
            merchantRepository.deleteById(id);
        }
    }

    public Merchant update (Merchant merchant, String id) {

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
}
