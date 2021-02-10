<<<<<<< HEAD
package com.ifood.merchant.configuration;
=======
<<<<<<< HEAD
package com.ifood.merchant.configuration;
=======
package com.ifood.customer.configuration;
>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682
>>>>>>> 78be23350b70b2e90459fecaa93e25c1b658de6b

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