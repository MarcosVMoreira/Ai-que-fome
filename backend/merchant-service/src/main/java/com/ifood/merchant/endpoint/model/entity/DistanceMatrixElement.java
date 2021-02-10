<<<<<<< HEAD
package com.ifood.merchant.endpoint.model.entity;
=======
package com.ifood.customer.endpoint.model.entity;
>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682

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