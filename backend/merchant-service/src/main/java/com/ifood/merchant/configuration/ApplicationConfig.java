<<<<<<< HEAD
package com.ifood.merchant.configuration;
=======
package com.ifood.customer.configuration;
>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class ApplicationConfig {

    @Value("${google-maps.access-key}")
    public String googleMapsKey;

    @Value("${google-maps.distance-calculator}")
    public String googleMapsDistanceCalculatorEndpoint;

    @Value("${google-maps.geocode}")
    public String googleMapsGeocodeEndpoint;

}