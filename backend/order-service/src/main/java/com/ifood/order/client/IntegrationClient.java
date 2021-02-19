package com.ifood.order.client;

import com.ifood.order.configuration.ApplicationConfig;
import com.ifood.order.endpoint.error.UnprocessableEntityException;
import com.ifood.order.endpoint.model.Merchant;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Service
@RequiredArgsConstructor
public class IntegrationClient {

    private final ApplicationConfig applicationConfig;
    private final RestTemplateBuilder restTemplateBuilder;

    public Merchant findMerchantById (String idMerchant) {
        log.info("[Merchant Integration] Finding merchant by id");
        UriBuilder builder = UriComponentsBuilder.fromUriString(applicationConfig.getMerchantFindById() + idMerchant);

        HttpHeaders headers = new HttpHeaders();

        headers.set("Authorization", applicationConfig.getMicroserviceAccessToken());

        RequestEntity<?> requestEntity = RequestEntity.get(builder.build()).headers(headers).build();

        try {
            ResponseEntity<Merchant> responseEntity = restTemplateBuilder.build()
                    .exchange(requestEntity, Merchant.class);
            return responseEntity.getBody();
        } catch (HttpStatusCodeException e) {
            log.error("[CSU] Error while trying to check if merchant exist. Status: {} \n Message: {}", e.getStatusCode(),
                    e.getResponseBodyAsString(),
                    e);
            throw new UnprocessableEntityException("422.001");
        }
    }

    //TODO refazer o esquema do findCustomerById para ficar parecido com
    //findMerchantById, sem retornar boolean
    public boolean findCustomerById (String idCustomer) {
        log.info("[Customer Integration] Finding customer by id");
        UriBuilder builder = UriComponentsBuilder.fromUriString(applicationConfig.getCustomerFindById() + idCustomer);

        HttpHeaders headers = new HttpHeaders();

        headers.set("Authorization", applicationConfig.getMicroserviceAccessToken());

        RequestEntity<?> requestEntity = RequestEntity.get(builder.build()).headers(headers).build();

        try {
            ResponseEntity<Object> responseEntity = restTemplateBuilder.build()
                    .exchange(requestEntity, Object.class);
            return responseEntity.getStatusCode().equals(HttpStatus.OK);
        } catch (HttpStatusCodeException e) {
            log.error("[CSU] Error while trying to check if customer exist. Status: {} \n Message: {}", e.getStatusCode(),
                    e.getResponseBodyAsString(),
                    e);
            throw new UnprocessableEntityException("422.002");
        }
    }
}