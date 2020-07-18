package com.customer.customer.endpoint.model.DTO;

import lombok.Data;

import java.util.List;

@Data
public class AddressDTO {

    private String idCustomer;

    private String streetName;

    private Long streetNumber;

    private String district;

    private String city;

    private String neighborhood;

    private String country;

    private String postalCode;

    private List<String> coordinates;

    private boolean favorite;

    private String complement;

    private String refPoint;

}
