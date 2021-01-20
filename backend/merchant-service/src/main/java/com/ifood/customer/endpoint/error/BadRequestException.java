package com.ifood.customer.endpoint.error;

import com.ifood.customer.endpoint.model.entity.ErrorResponse;
import org.springframework.http.HttpStatus;

public class BadRequestException extends RestException {

    private static final long serialVersionUID = -6522585356980537304L;

    private String responseBodyCode;

    private ErrorResponse responseBody;

    public BadRequestException(String responseBodyCode) {
        this.responseBodyCode = responseBodyCode;
    }

    public BadRequestException(ErrorResponse responseBody) {
        this.responseBody = responseBody;
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.BAD_REQUEST;
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