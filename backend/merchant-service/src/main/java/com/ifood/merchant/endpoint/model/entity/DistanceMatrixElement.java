<<<<<<< HEAD
package com.ifood.merchant.endpoint.model.entity;
=======
<<<<<<< HEAD
package com.ifood.merchant.endpoint.model.entity;
=======
package com.ifood.customer.endpoint.model.entity;
>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682
>>>>>>> 78be23350b70b2e90459fecaa93e25c1b658de6b

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DistanceMatrixElement {

    private String status;

    private DistanceMatrixElementObject distance;

    private DistanceMatrixElementObject duration;
}