package com.ifood.order.endpoint.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ErrorResponse {
    private String code;
    private String message;
    private String detail;

    public ErrorResponse(String code, String message, String detail) {
        this.code = code;
        this.message = message;
        this.detail = detail;
    }

    public ErrorResponse(String code, String message) {
        this.code = code;
        this.message = message;
    }

}
