package com.ifood.customer.client;

import com.ifood.customer.configuration.ApplicationConfig;
import com.ifood.customer.endpoint.error.UnprocessableEntityException;
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

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class IntegrationClient {

    private final ApplicationConfig applicationConfig;
    private final RestTemplateBuilder restTemplateBuilder;

    public boolean calculateDistance (List<String> merchantLocation, String customerLocation) {
        log.info("[Google Maps Integration] Calculating distance between customer and merchant", customerLocation, merchantLocation);

        String pipeSeparatedMerchantLocations = merchantLocation.stream().collect(Collectors.joining("|"));

        UriBuilder builder = UriComponentsBuilder
                .fromUriString(applicationConfig.getGoogleMapsDistanceCalculatorEndpoint() +
                        "origins=" + pipeSeparatedMerchantLocations +
                        "&destinations=" + customerLocation +
                        "&key=" + applicationConfig.getGoogleMapsKey());

        HttpHeaders headers = new HttpHeaders();

        RequestEntity<?> requestEntity = RequestEntity.get(builder.build()).headers(headers).build();
        try {
            ResponseEntity<Object> responseEntity = restTemplateBuilder.build()
                    .exchange(requestEntity, Object.class);
            //criar o objeto para receber a resposta do google e passar ele no lugar do object aqui em cima
//            return responseEntity.getBody();
            return true;
        } catch (HttpStatusCodeException e) {
            log.error("[Google Maps Integration] Error while retrieving customer distance from merchants. Status: {} \n Message: {}", e.getStatusCode(),
                    e.getResponseBodyAsString(),
                    e);
            if (e.getStatusCode().equals(HttpStatus.NOT_FOUND)) {
                return false;
            }
            throw new UnprocessableEntityException("422.000");
        }
    }
}