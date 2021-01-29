package com.ifood.customer.endpoint.model.entity;

import com.ifood.customer.endpoint.enumeration.MerchantTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

@Data
@Document
@AllArgsConstructor
@Builder
public class FindDistanceResponse {

    private String merchantId;

    private String name;

    private String logo;

    private Integer distance;

    private Integer duration;

    private Float fee;

    private Float rate;

    private List<MerchantTypeEnum> type;

}