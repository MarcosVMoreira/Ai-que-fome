<<<<<<< HEAD
package com.ifood.merchant.endpoint.model.entity;

import com.ifood.merchant.endpoint.enumeration.MerchantTypeEnum;
=======
package com.ifood.customer.endpoint.model.entity;

>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

<<<<<<< HEAD
import java.util.List;
=======
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;
>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682

@Data
@Document
@AllArgsConstructor
@Builder
public class FindDistanceResponse {

    private String merchantId;

<<<<<<< HEAD
    private String name;

    private String logo;

    private Float distance;

    private Float duration;

    private Float fee;

    private Float rate;

    private List<MerchantTypeEnum> type;

=======
    private String logo;

    private String distance;

    private String duration;

    private BigInteger fee;

    private String rate;
>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682
}