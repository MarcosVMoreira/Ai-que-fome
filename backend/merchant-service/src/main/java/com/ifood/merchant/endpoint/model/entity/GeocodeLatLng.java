<<<<<<< HEAD
package com.ifood.merchant.endpoint.model.entity;
=======
<<<<<<< HEAD
package com.ifood.merchant.endpoint.model.entity;
=======
package com.ifood.customer.endpoint.model.entity;
>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682
>>>>>>> 78be23350b70b2e90459fecaa93e25c1b658de6b

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import java.util.List;

>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682
>>>>>>> 78be23350b70b2e90459fecaa93e25c1b658de6b
@Data
@Document
@AllArgsConstructor
@Builder
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@NoArgsConstructor
public class GeocodeLatLng {

    private String lat;

    private String lng;
}