package com.ifood.customer.endpoint.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Document
@AllArgsConstructor
@Builder
public class FindDistanceResponse {

    private List<DistanceBasedMerchant> distanceBasedMerchants;
}