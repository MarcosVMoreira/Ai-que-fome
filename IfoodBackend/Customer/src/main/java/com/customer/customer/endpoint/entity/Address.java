package com.customer.customer.endpoint.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    @Id
    private String id;

    @NotEmpty(message = "The field 'idCustomer' is mandatory")
    private String idCustomer;

    @NotEmpty(message = "The field 'streetName' is mandatory")
    private String streetName;

    @NotNull(message = "The field 'streetNumber' is mandatory")
    private Long streetNumber;

    private String complement;

    @NotEmpty(message = "The field 'refPoint' is mandatory")
    private String refPoint;

    @NotEmpty(message = "The field 'district' is mandatory")
    private String district;

    @NotEmpty(message = "The field 'city' is mandatory")
    private String city;

    @NotEmpty(message = "The field 'neighborhood' is mandatory")
    private String neighborhood;

    @NotEmpty(message = "The field 'country' is mandatory")
    private String country;

    @NotEmpty(message = "The field 'postalCode' is mandatory")
    @Size(max = 8)
    private String postalCode;

    private List<String> coordinates;

    private boolean favorite;

    public Address (@NotEmpty(message = "The field 'idCustomer' is mandatory") String idCustomer,
                    @NotEmpty(message = "The field 'streetName' is mandatory") String streetName,
                    @NotNull(message = "The field 'streetNumber' is mandatory") Long streetNumber,
                    String complement,
                    @NotEmpty(message = "The field 'refPoint' is mandatory") String refPoint,
                    @NotEmpty(message = "The field 'district' is mandatory") String district,
                    @NotEmpty(message = "The field 'city' is mandatory") String city,
                    @NotEmpty(message = "The field 'neighborhood' is mandatory") String neighborhood,
                    @NotEmpty(message = "The field 'country' is mandatory") String country,
                    @NotEmpty(message = "The field 'postalCode' is mandatory")
                    @Size(max = 8) String postalCode,
                    List<String> coordinates,
                    boolean favorite) {

        this.idCustomer = idCustomer;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.complement = complement;
        this.refPoint = refPoint;
        this.district = district;
        this.city = city;
        this.neighborhood = neighborhood;
        this.country = country;
        this.postalCode = postalCode;
        this.coordinates = coordinates;
        this.favorite = favorite;
    }

}
