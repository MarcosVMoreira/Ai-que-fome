package com.customer.customer.endpoint.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AddressID")
    private Long id;

    @NotNull(message = "The field 'idCustomer' is mandatory")
    @Column(name = "CustomerID")
    private Long idCustomer;

    @NotEmpty(message = "The field 'information' is mandatory")
    @Column(name = "Information")
    private String information;

    @NotNull(message = "The field 'number' is mandatory")
    @Column(name = "Number")
    private Long number;

    @NotEmpty(message = "The field 'complement' is mandatory")
    @Column(name = "Complement")
    @Size(max = 100)
    private String complement;

    @NotEmpty(message = "The field 'refPoint' is mandatory")
    @Column(name = "ReferencePoint")
    private String refPoint;

    @Column(name = "Favorite")
    private boolean favorite;

    public Address (@NotEmpty(message = "The field 'idCustomer' is mandatory") Long idCustomer,
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
