<<<<<<< HEAD
package com.ifood.merchant.client;

import com.ifood.merchant.configuration.ApplicationConfig;
import com.ifood.merchant.endpoint.error.UnprocessableEntityException;
import com.ifood.merchant.endpoint.model.entity.DistanceMatrixResponse;
import com.ifood.merchant.endpoint.model.entity.GeocodeResponse;
=======
package com.ifood.customer.client;

import com.ifood.customer.configuration.ApplicationConfig;
import com.ifood.customer.endpoint.error.UnprocessableEntityException;
import com.ifood.customer.endpoint.model.entity.DistanceMatrixResponse;
import com.ifood.customer.endpoint.model.entity.GeocodeResponse;
>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpHeaders;
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

    public DistanceMatrixResponse calculateDistance (List<String> merchantLocation, String customerLocation) {
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
            ResponseEntity<DistanceMatrixResponse> responseEntity = restTemplateBuilder.build()
                    .exchange(requestEntity, DistanceMatrixResponse.class);
            return responseEntity.getBody();
        } catch (HttpStatusCodeException e) {
            log.error("[Google Maps Integration] Error while retrieving customer distance from merchants. Status: {} \n Message: {}", e.getStatusCode(),
                    e.getResponseBodyAsString(),
                    e);
            throw new UnprocessableEntityException("422.000");
        }
    }

    public GeocodeResponse findCityByCoord (String customerLocation) {
        log.info("[Google Maps Integration] Requesting geocode API.", customerLocation);

        UriBuilder builder = UriComponentsBuilder
                .fromUriString(applicationConfig.getGoogleMapsGeocodeEndpoint() +
                        "latlng=" + customerLocation +
                        "&key=" + applicationConfig.getGoogleMapsKey());

        HttpHeaders headers = new HttpHeaders();

        RequestEntity<?> requestEntity = RequestEntity.get(builder.build()).headers(headers).build();
        try {
            ResponseEntity<GeocodeResponse> responseEntity = restTemplateBuilder.build()
                    .exchange(requestEntity, GeocodeResponse.class);
            return responseEntity.getBody();
        } catch (HttpStatusCodeException e) {
            log.error("[Google Maps Integration] Error while retrieving geocode API info. Status: {} \n Message: {}", e.getStatusCode(),
                    e.getResponseBodyAsString(),
                    e);
            throw new UnprocessableEntityException("422.000");
        }
    }
}