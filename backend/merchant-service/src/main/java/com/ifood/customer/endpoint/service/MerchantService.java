package com.ifood.customer.endpoint.service;

import com.ifood.customer.client.IntegrationClient;
import com.ifood.customer.endpoint.enumeration.AllowedPaymentEnum;
import com.ifood.customer.endpoint.enumeration.MerchantTypeEnum;
import com.ifood.customer.endpoint.error.BadRequestException;
import com.ifood.customer.endpoint.error.NotFoundException;
import com.ifood.customer.endpoint.error.UnprocessableEntityException;
import com.ifood.customer.endpoint.model.entity.*;
import com.ifood.customer.endpoint.repository.MerchantRepository;
import com.ifood.customer.producer.MerchantMessageProducer;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class MerchantService {

    Logger logger = LoggerFactory.getLogger(MerchantService.class);

    private final MerchantRepository merchantRepository;

    private final MerchantMessageProducer messageProducer;

    private final NextSequenceService nextSequenceService;

    private final IntegrationClient integrationClient;

    public List<FindDistanceResponse> listAll (Pageable pageable, String customerCoords) {
        logger.info("Recuperando da base de dados todos os restaurantes...");

        return findCustomerDistanceFromMerchants(pageable, customerCoords);
    }

    public Merchant save (Merchant merchant) {
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

        merchant.setCode(nextSequenceService.getNextSequence("DatabaseSequence"));

        Merchant savedMerchant = merchantRepository.save(merchant);

        messageProducer.sendMerchantDataToRabbit(savedMerchant);

        return savedMerchant;
    }

    public Merchant getMerchantById (String id) {
        logger.info("Recuperando da base de dados todos registros utilizando o id {}", id);
        return merchantRepository.findById(id)
                .orElseThrow(NotFoundException::new);
    }

    public Merchant getMerchantByEmail (String email) {
        logger.info("Recuperando da base de dados todos registros utilizando o email {}", email);
        return merchantRepository.findByEmail(email)
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
        merchant.setCode(verifyingDocument.get().getCode());

        return merchantRepository.save(merchant);
    }

    /* AllowedPayments */

    public Merchant updateAllowedPayment (String merchantId, @Valid List<AllowedPaymentEnum> receivedAllowedPayment) {
        Optional<Merchant> merchant = merchantRepository.findById(merchantId);

        if (!merchant.isPresent()) {
            throw new NotFoundException();
        }

        if (receivedAllowedPayment.isEmpty()) {
            throw new UnprocessableEntityException("400.004");
        }

        merchant.get().setAllowedPayments(receivedAllowedPayment);

        return merchantRepository.save(merchant.get());
    }

    /* Category */

    public Merchant updateCategory (String merchantId, @Valid List<Category> receivedCategory) {
        Optional<Merchant> merchant = merchantRepository.findById(merchantId);

        if (!merchant.isPresent()) {
            throw new NotFoundException();
        }

        if (receivedCategory.isEmpty()) {
            throw new UnprocessableEntityException("400.004");
        }

        receivedCategory.forEach(sku -> sku.setId(new Category().getId()));

        merchant.get().setCategories(receivedCategory);

        return merchantRepository.save(merchant.get());
    }

    /* SKU */

    public Merchant updateSKU (String merchantId, String categoryId, @Valid List<SKU> receivedSKU) {
        Optional<Merchant> merchant = merchantRepository.findById(merchantId);

        if (!merchant.isPresent()) {
            throw new NotFoundException();
        }

        if (merchant.get().getCategories().stream().noneMatch(category -> categoryId.equals(category.getId()))) {
            throw new NotFoundException();
        }

        if (receivedSKU.isEmpty()) {
            throw new UnprocessableEntityException("400.006");
        }

        receivedSKU.forEach(sku -> sku.setId(new Category().getId()));

        merchant.get().getCategories()
                .stream()
                .filter(category -> categoryId.equals(category.getId()))
                .forEach(filteredCategory -> filteredCategory.setSkus(receivedSKU));

        return merchantRepository.save(merchant.get());
    }

    /* Merchant Type */

    public Merchant updateMerchantType (String merchantId, @Valid List<MerchantTypeEnum> receivedMerchantType) {
        Optional<Merchant> merchant = merchantRepository.findById(merchantId);

        if (!merchant.isPresent()) {
            throw new NotFoundException();
        }

        if (receivedMerchantType.isEmpty()) {
            throw new UnprocessableEntityException("400.007");
        }

        merchant.get().setMerchantType(receivedMerchantType);

        return merchantRepository.save(merchant.get());
    }

    public List<FindDistanceResponse> findCustomerDistanceFromMerchants (Pageable pageable, String customerCoords) {

        GeocodeResponse geocodeResponse = integrationClient.findCityByCoord(customerCoords);

        if (geocodeResponse.getResults().isEmpty()) {
            throw new NotFoundException("400.008");
        }

        List<GeocodeAddressComponent> foundAddress = geocodeResponse.getResults().get(0).getAddressComponents()
                .stream()
                .filter(item -> item.getTypes().stream().anyMatch(s -> s.equals("administrative_area_level_2")))
                .collect(Collectors.toList());

        String city = foundAddress.get(0).getLongName();

        ArrayList<Merchant> merchantsPresentInCustomersCity = new ArrayList<>(merchantRepository.findByCity(pageable, city));

        if (merchantsPresentInCustomersCity.isEmpty()) {
            throw new NotFoundException("400.009");
        }

        List<String> merchantNames = merchantsPresentInCustomersCity.stream()
                .map(merchant -> String.join(",", merchant.getCoordinates()))
                .collect(Collectors.toList());

        DistanceMatrixResponse googleMapsResponse = integrationClient.calculateDistance(merchantNames, customerCoords);

        List<FindDistanceResponse> merchantList = new ArrayList<>();

        List<DistanceMatrixElement> collect = googleMapsResponse.getRows()
                .stream()
                .map(distanceMatrixRow -> distanceMatrixRow.getElements())
                .collect(Collectors.toList())
                .stream()
                .map(distanceMatrixElements -> distanceMatrixElements.get(0))
                .collect(Collectors.toList());

        collect.stream()
                .map(item -> merchantList.add(FindDistanceResponse
                        .builder()
                        .distance(item.getDistance().getText())
                        .duration(item.getDuration().getText())
                        .build()))
                .collect(Collectors.toList());

        IntStream.range(0, merchantList.size())
                .forEach(index -> {
                    merchantList.get(index).setMerchantId(merchantsPresentInCustomersCity.get(index).getId());
                    merchantList.get(index).setLogo(merchantsPresentInCustomersCity.get(index).getLogo());
                });

        return merchantList;
    }
}