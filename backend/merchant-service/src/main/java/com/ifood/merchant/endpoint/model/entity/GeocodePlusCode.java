<<<<<<< HEAD
package com.ifood.merchant.endpoint.model.entity;
=======
package com.ifood.customer.endpoint.model.entity;
>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

<<<<<<< HEAD
=======
import java.util.List;

>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682
@Data
@Document
@AllArgsConstructor
@Builder
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@NoArgsConstructor
public class GeocodePlusCode {

    private String compoundCode;

    private String globalCode;
}