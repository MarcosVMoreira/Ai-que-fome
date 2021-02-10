package com.ifood.merchant.endpoint.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ifood.merchant.endpoint.enumeration.AllowedPaymentEnum;
import com.ifood.merchant.endpoint.enumeration.MerchantTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalTime;
import java.util.List;

@Data
@Document
@AllArgsConstructor
@Builder
public class Merchant {

    @Id
    private String id;

    private long code;

    @NotEmpty(message = "400.003")
    @Indexed(unique = true)
    private String document;

    @NotEmpty(message = "400.003")
    private String name;

    @NotEmpty(message = "400.003")
    @Indexed(unique = true)
    private String email;

    @NotEmpty(message = "400.003")
    private String logo;

    private String image;

    @NotEmpty(message = "400.003")
    private String phone;

    @NotEmpty(message = "400.003")
    private String country;

    @NotEmpty(message = "400.003")
    private String state;

    @NotEmpty(message = "400.003")
    private String city;

    @NotEmpty(message = "400.003")
    private String neighborhood;

    @NotEmpty(message = "400.003")
    private String streetName;

    @NotEmpty(message = "400.003")
    private String streetNumber;

    @NotEmpty(message = "400.003")
    private String postalCode;

    @NotNull(message = "400.003")
    private boolean availability;

    @NotNull(message = "400.003")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime businessStart;

    @NotNull(message = "400.003")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime businessEnd;

    @NotNull(message = "400.003")
    private List<String> coordinates;

    @NotNull(message = "400.003")
    private Float basePreparationTime = (float) 0.0;

    private List<AllowedPaymentEnum> allowedPayments;

    private List<Category> categories;

    private List<MerchantTypeEnum> merchantType;

<<<<<<< HEAD:backend/merchant-service/src/main/java/com/ifood/merchant/endpoint/model/entity/Merchant.java
    private Float rate = (float) 0;
=======
    private Float rate;
>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682:backend/merchant-service/src/main/java/com/ifood/customer/endpoint/model/entity/Merchant.java

    private Integer rateAmount = 0;

<<<<<<< HEAD:backend/merchant-service/src/main/java/com/ifood/merchant/endpoint/model/entity/Merchant.java
    private String description;

=======
>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682:backend/merchant-service/src/main/java/com/ifood/customer/endpoint/model/entity/Merchant.java
}
