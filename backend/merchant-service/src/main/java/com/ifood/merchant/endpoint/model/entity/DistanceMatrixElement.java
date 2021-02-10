package com.ifood.customer.endpoint.model.entity;

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