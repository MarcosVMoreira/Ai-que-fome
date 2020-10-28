package com.ifood.customer.endpoint.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@Document
@AllArgsConstructor
public class Address {

    private String id;

    @NotEmpty(message = "The field 'streetName' is mandatory")
    private String streetName;

    @NotNull(message = "The field 'streetNumber' is mandatory")
    private Long streetNumber;

    @NotEmpty(message = "The field 'district' is mandatory")
    private String district;

    @NotEmpty(message = "The field 'city' is mandatory")
    private String city;

    @NotEmpty(message = "The field 'neighborhood' is mandatory")
    private String neighborhood;

    @NotEmpty(message = "The field 'country' is mandatory")
    private String country;

    @NotEmpty(message = "The field 'postalCode' is mandatory")
    @Size(max = 8, message = "Wrong size for field 'postalCode'")
    @Size(min = 8, message = "Wrong size for field 'postalCode'")
    private String postalCode;

    private List<String> coordinates;

    private boolean favorite;

    private String complement;

    private String refPoint;

    public Address () {
        id = new ObjectId().toString();
    }

    public Address (@NotEmpty(message = "The field 'streetName' is mandatory") String streetName, @NotNull(message = "The field 'streetNumber' is mandatory") Long streetNumber, @NotEmpty(message = "The field 'district' is mandatory") String district, @NotEmpty(message = "The field 'city' is mandatory") String city, @NotEmpty(message = "The field 'neighborhood' is mandatory") String neighborhood, @NotEmpty(message = "The field 'country' is mandatory") String country, @NotEmpty(message = "The field 'postalCode' is mandatory") @Size(max = 8, message = "Wrong size for field 'postalCode'") @Size(min = 8, message = "Wrong size for field 'postalCode'") String postalCode, List<String> coordinates, boolean favorite, String complement, String refPoint) {
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.district = district;
        this.city = city;
        this.neighborhood = neighborhood;
        this.country = country;
        this.postalCode = postalCode;
        this.coordinates = coordinates;
        this.favorite = favorite;
        this.complement = complement;
        this.refPoint = refPoint;
    }

    public Address (@NotEmpty(message = "The field 'streetName' is mandatory") String streetName, @NotNull(message = "The field 'streetNumber' is mandatory") Long streetNumber, @NotEmpty(message = "The field 'district' is mandatory") String district, @NotEmpty(message = "The field 'city' is mandatory") String city, @NotEmpty(message = "The field 'neighborhood' is mandatory") String neighborhood, @NotEmpty(message = "The field 'country' is mandatory") String country, @NotEmpty(message = "The field 'postalCode' is mandatory") @Size(max = 8, message = "Wrong size for field 'postalCode'") @Size(min = 8, message = "Wrong size for field 'postalCode'") String postalCode) {
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.district = district;
        this.city = city;
        this.neighborhood = neighborhood;
        this.country = country;
        this.postalCode = postalCode;
    }
}
