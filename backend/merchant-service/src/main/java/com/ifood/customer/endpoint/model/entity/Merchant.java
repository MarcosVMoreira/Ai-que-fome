package com.ifood.customer.endpoint.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ifood.customer.endpoint.enumeration.AllowedPaymentEnum;
import com.ifood.customer.endpoint.enumeration.MerchantTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@Document
@AllArgsConstructor
@Builder
public class Merchant {

    @Id
    private String id;

    @NotEmpty(message = "400.003")
    @Indexed(unique=true)
    private String document;

    @NotEmpty(message = "400.003")
    private String name;

    @NotEmpty(message = "400.003")
    @Indexed(unique=true)
    private String email;

    @NotEmpty(message = "400.003")
    private String logo;

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

    private List<String> coordinates;

    private List<AllowedPaymentEnum> allowedPayments;

    private List<Category> categories;

    private List<SKU> skus;

    private List<MerchantTypeEnum> merchantType;

    private BigDecimal rate;

    private String description;

    private String basePreparationTime;

}
