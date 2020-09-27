package com.ifood.auth.endpoint.model.dto;

import lombok.Data;

@Data
public class ApplicationUserDTO {

    private String id;

    private String email;

    private String role;

}
