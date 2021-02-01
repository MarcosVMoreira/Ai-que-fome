package com.ifood.merchant.endpoint.model.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
@AllArgsConstructor
@Builder
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@NoArgsConstructor
public class GeocodeResult {

    private List<GeocodeAddressComponent> addressComponents;

    private String formattedAddress;

    private GeocodeGeometry geometry;

    private String placeId;

    private GeocodePlusCode plusCode;

    private List<String> types;
}