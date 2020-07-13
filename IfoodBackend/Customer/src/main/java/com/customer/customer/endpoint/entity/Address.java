package com.customer.customer.endpoint.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    @Id
    private String id;

    @NotEmpty(message = "The field 'idCustomer' is mandatory")
    private String idCustomer;

    @NotEmpty(message = "The field 'information' is mandatory")
    private String information;

    @NotNull(message = "The field 'number' is mandatory")
    private Long number;

    @NotEmpty(message = "The field 'complement' is mandatory")
    @Size(max = 100)
    private String complement;

    @NotEmpty(message = "The field 'refPoint' is mandatory")
    private String refPoint;

    private boolean favorite;

    public Address (@NotEmpty(message = "The field 'idCustomer' is mandatory") String idCustomer,
                    @NotEmpty(message = "The field 'information' is mandatory") String information,
                    @NotEmpty(message = "The field 'number' is mandatory") Long number,
                    @NotEmpty(message = "The field 'complement' is mandatory") @Size(max = 100) String complement,
                    @NotEmpty(message = "The field 'refPoint' is mandatory") String refPoint,
                    boolean favorite) {
        this.idCustomer = idCustomer;
        this.information = information;
        this.number = number;
        this.complement = complement;
        this.refPoint = refPoint;
        this.favorite = favorite;
    }
}
