package com.ifood.merchant.endpoint.service;

import com.ifood.merchant.client.IntegrationClient;
import com.ifood.merchant.endpoint.enumeration.AllowedPaymentEnum;
import com.ifood.merchant.endpoint.enumeration.MerchantTypeEnum;
import com.ifood.merchant.endpoint.error.BadRequestException;
import com.ifood.merchant.endpoint.error.NotFoundException;
import com.ifood.merchant.endpoint.error.UnprocessableEntityException;
import com.ifood.merchant.endpoint.model.entity.Category;
import com.ifood.merchant.endpoint.model.entity.DistanceMatrixElement;
import com.ifood.merchant.endpoint.model.entity.DistanceMatrixResponse;
import com.ifood.merchant.endpoint.model.entity.DistanceMatrixRow;
import com.ifood.merchant.endpoint.model.entity.FindDistanceResponse;
import com.ifood.merchant.endpoint.model.entity.GeocodeAddressComponent;
import com.ifood.merchant.endpoint.model.entity.GeocodeResponse;
import com.ifood.merchant.endpoint.model.entity.Merchant;
import com.ifood.merchant.endpoint.model.entity.SKU;
import com.ifood.merchant.endpoint.repository.MerchantRepository;
import com.ifood.merchant.producer.MerchantMessageProducer;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
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

    public List<FindDistanceResponse> listAll(Pageable pageable, String customerCoords, String name,
                                              String type, String payment,
                                              Float distance, Float fee) {
        logger.info("Recuperando da base de dados todos os restaurantes com base nos filtros passados...");

        /*TODO REFAZER TODO ESSE CÓDIGO MACARRÔNICO. A FILTRAGEM ESTÁ PATÉTICA DE MAL FEITA. SOLID FOI PRO ESPAÇO
        ACONSELHO VOCE A NÃO OLHAR O CÓDIGO QUE ESSE MÉTODO CHAMA PORQUE ESTÁ BEM TRISTE A SITUAÇÃO*/
        return findCustomerDistanceFromMerchants(pageable, customerCoords, name, type, payment,
                distance, fee);
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

        merchant.setCode(nextSequenceService.getNextSequence("DatabaseSequence"));

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
        merchant.setCode(verifyingDocument.get().getCode());

        return merchantRepository.save(merchant);
    }

    /* AllowedPayments */

    public Merchant updateAllowedPayment(String merchantId, @Valid List<AllowedPaymentEnum> receivedAllowedPayment) {
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

    public Merchant updateCategory(String merchantId, @Valid List<Category> receivedCategory) {
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

    public Merchant updateSKU(String merchantId, String categoryId, @Valid List<SKU> receivedSKU) {
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

    public Merchant updateMerchantType(String merchantId, @Valid List<MerchantTypeEnum> receivedMerchantType) {
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


    /* Infos calculation about delivery */

    public List<FindDistanceResponse> findCustomerDistanceFromMerchants(Pageable pageable, String customerCoords,
                                                                        String name,
                                                                        String type, String payment,
                                                                        Float distance, Float fee) {
        String city = findCityFromCoordinates(customerCoords);

        List<Merchant> merchantsFilteredByCityNameTypePayment = filterMerchantByGivenFilters(pageable, name, city, type, payment);

        List<String> merchantNames = merchantsFilteredByCityNameTypePayment.stream()
                .map(merchant -> String.join(",", merchant.getCoordinates()))
                .collect(Collectors.toList());

        DistanceMatrixResponse googleMapsResponse = integrationClient.calculateDistance(merchantNames, customerCoords);

        List<FindDistanceResponse> merchantList = buildMerchantListFromGoogleResponse(googleMapsResponse);

        List<FindDistanceResponse> finalMerchantList = merchantList;
        IntStream.range(0, merchantList.size())
                .forEach(index -> {
                    finalMerchantList.get(index).setMerchantId(merchantsFilteredByCityNameTypePayment.get(index).getId());
                    finalMerchantList.get(index).setLogo(merchantsFilteredByCityNameTypePayment.get(index).getLogo());
                    finalMerchantList.get(index).setRate(merchantsFilteredByCityNameTypePayment.get(index).getRate());
                    finalMerchantList.get(index).setName(merchantsFilteredByCityNameTypePayment.get(index).getName());
                    finalMerchantList.get(index).setType(merchantsFilteredByCityNameTypePayment.get(index).getMerchantType());
                    finalMerchantList.get(index).setDuration(deliveryTimeCalculation(finalMerchantList.get(index).getDistance(),
                            merchantsFilteredByCityNameTypePayment.get(index).getBasePreparationTime()));
                    finalMerchantList.get(index).setFee(feeCalculation(finalMerchantList.get(index).getDistance()));
                });

        List<FindDistanceResponse> filteredMerchantList = finalMerchantList;

        if (distance != null) {
            filteredMerchantList = filteredMerchantList.stream()
                    .filter(item -> (item.getDistance()
                            <= distance))
                    .collect(Collectors.toList());
        }

        if (fee != null) {
            filteredMerchantList = filteredMerchantList.stream()
                    .filter(item -> (item.getFee()
                            <= fee))
                    .collect(Collectors.toList());
        }

        //TODO EU AVISEI QUE TAVA ZOADO. VOU REFATORAR TUDO, MAS AGR ESTOU SEM TEMPO. TCC É TRISTE
        return filteredMerchantList;
    }

    private String findCityFromCoordinates(String coordinates) {
        GeocodeResponse geocodeResponse = integrationClient.findCityByCoord(coordinates);

        if (geocodeResponse.getResults().isEmpty()) {
            throw new NotFoundException("400.008");
        }

        List<GeocodeAddressComponent> foundAddress = geocodeResponse.getResults().get(0).getAddressComponents()
                .stream()
                .filter(item -> item.getTypes().stream().anyMatch(s -> s.equals("administrative_area_level_2")))
                .collect(Collectors.toList());

        if (foundAddress.isEmpty()) {
            throw new NotFoundException("400.008");
        }

        return foundAddress.get(0).getLongName();
    }

    private List<Merchant> filterMerchantByGivenFilters(Pageable pageable, String name, String city, String type, String payment) {
        List<Merchant> merchantsFilteredByCity = merchantRepository.findByCity(pageable, city);
        List<String> typeList = null;
        List<String> paymentList = null;

        if (merchantsFilteredByCity.isEmpty()) {
            return merchantsFilteredByCity;
        }

        if (name != null && !name.isEmpty()) {
            merchantsFilteredByCity =
                    merchantsFilteredByCity.stream()
                            .filter(item -> item.getName().contains(name))
                            .collect(Collectors.toList());
        }

        if (type != null && !type.isEmpty()) {
            typeList = new ArrayList<>(Arrays.asList(type.split(",")));

            List<String> finalTypeList = typeList;
            merchantsFilteredByCity =
                    merchantsFilteredByCity.stream()
                            .filter(item -> merchantTypeCompare(item.getMerchantType(), finalTypeList))
                            .collect(Collectors.toList());
        }
        if (payment != null && !payment.isEmpty()) {
            paymentList = new ArrayList<>(Arrays.asList(payment.split(",")));

            List<String> finalPaymentList = paymentList;
            merchantsFilteredByCity =
                    merchantsFilteredByCity.stream()
                            .filter(item -> allowedPaymentsCompare(item.getAllowedPayments(), finalPaymentList))
                            .collect(Collectors.toList());
        }

        return merchantsFilteredByCity;
    }

    private boolean merchantTypeCompare(List<MerchantTypeEnum> foundMerchantList, List<String> receivedFilter) {
        if (foundMerchantList == null) {
            return false;
        }
        return foundMerchantList.stream()
                .anyMatch(item -> receivedFilter.contains(item.name()));
    }

    private boolean allowedPaymentsCompare(List<AllowedPaymentEnum> foundMerchantList, List<String> receivedFilter) {
        if (foundMerchantList == null) {
            return false;
        }
        return foundMerchantList.stream()
                .anyMatch(item -> receivedFilter.contains(item.name()));
    }

    private List<FindDistanceResponse> buildMerchantListFromGoogleResponse(DistanceMatrixResponse googleMapsResponse) {
        List<FindDistanceResponse> merchantList = new ArrayList<>();

        List<DistanceMatrixElement> collect = googleMapsResponse.getRows()
                .stream()
                .map(DistanceMatrixRow::getElements)
                .collect(Collectors.toList())
                .stream()
                .map(distanceMatrixElements -> distanceMatrixElements.get(0))
                .collect(Collectors.toList());

        collect.stream()
                .map(item -> merchantList.add(FindDistanceResponse
                        .builder()
                        .distance(stringSplitterToFloat(item.getDistance().getText()))
                        .duration(stringSplitterToFloat(item.getDuration().getText()))
                        .build()))
                .collect(Collectors.toList());

        return merchantList;
    }

    private Float stringSplitterToFloat(String receivedString) {
        return Float.parseFloat(receivedString.split(" ")[0]);
    }

    private Float deliveryTimeCalculation(Float distance, Float baseTime) {
        return distance * 5 + baseTime;
    }

    private Float feeCalculation(Float distance) {
        return distance < 2 ? 0 : 1 + distance;
    }

    /* Save received async rate */

    public void saveRate(String merchantId, Float rate) {
        logger.info("Message consumed from merchant-rated queue.");
        Optional<Merchant> merchant = merchantRepository.findById(merchantId);

        if (!merchant.isPresent()) {
            throw new NotFoundException();
        }

        Merchant merchantObject = merchant.get();

        Float newRateValue = calculateRateValue(merchantObject.getRateAmount(), merchantObject.getRate(), rate);

        merchantObject.setRate(newRateValue);
        merchantObject.setRateAmount(merchantObject.getRateAmount()+1);

        logger.info("Saving new merchant rate... ");
        merchantRepository.save(merchantObject);
    }

    private Float calculateRateValue(Integer rateAmount,
                                     Float actualMerchantRateValue, Float rateGivenByCustomer) {
        return (actualMerchantRateValue + rateGivenByCustomer) / (rateAmount + 1);
    }
}