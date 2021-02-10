package com.ifood.merchant.endpoint.error;

import com.ifood.merchant.endpoint.model.entity.ErrorResponse;
import org.springframework.http.HttpStatus;

public class UnprocessableEntityException extends RestException {

    private static final long serialVersionUID = -6522585356980537304L;

    private String responseBodyCode;

    private ErrorResponse responseBody;

    public UnprocessableEntityException(String responseBodyCode) {
        this.responseBodyCode = responseBodyCode;
    }

    public UnprocessableEntityException(ErrorResponse responseBody) {
        this.responseBody = responseBody;
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.UNPROCESSABLE_ENTITY;
    }

    @Override
    public String getResponseBodyCode() {
        return responseBodyCode;
    }

    @Override
    public ErrorResponse getResponseBody() {
        return responseBody;
    }

}