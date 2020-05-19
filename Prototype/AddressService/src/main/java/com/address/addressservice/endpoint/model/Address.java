package com.address.addressservice.endpoint.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adr_id")
    private Long id;

    @NotNull(message = "The field 'id_customer' is mandatory")
    @Column(name = "adr_ctm_id")
    private Long idCustomer;

    @NotNull(message = "The field 'information' is mandatory")
    @Column(name = "adr_info")
    private String information;

    @NotNull(message = "The field 'number' is mandatory")
    @Column(name = "adr_number")
    private Long number;

    @NotNull(message = "The field 'complement' is mandatory")
    @Column(name = "adr_complement")
    @Size(max = 100)
    private String complement;

    @NotNull(message = "The field 'refPoint' is mandatory")
    @Column(name = "adr_ref_point")
    private String refPoint;

    @Column(name = "adr_favorite")
    private boolean favorite;




}
