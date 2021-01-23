package com.ifood.customer.configuration;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class ApplicationConfig {

//    @Value("${google-maps.access-key}")
//    public String googleMapsKey;

    @Value("${google-maps.distance-calculator}")
    public String googleMapsDistanceCalculatorEndpoint;

    @Value("${google-maps.geocode}")
    public String googleMapsGeocodeEndpoint;

}