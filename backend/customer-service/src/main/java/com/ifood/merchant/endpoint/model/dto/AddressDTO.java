package com.ifood.merchant.endpoint.model.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
public class AddressDTO {

    private String id;

    @NotEmpty(message = "422.002")
    private String streetName;

    @NotNull(message = "422.002")
    private Long streetNumber;

    @NotEmpty(message = "422.002")
    private String district;

    @NotEmpty(message = "422.002")
    private String city;

    @NotEmpty(message = "422.002")
    private String neighborhood;

    @NotEmpty(message = "422.002")
    private String country;

    @NotEmpty(message = "422.002")
    @Size(max = 8, message = "422.004")
    @Size(min = 8, message = "422.004")
    private String postalCode;

    private List<String> coordinates;

    private boolean favorite;

    private String complement;

    private String refPoint;
}