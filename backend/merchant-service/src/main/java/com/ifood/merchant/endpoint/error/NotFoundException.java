package com.ifood.merchant.endpoint.error;

import com.ifood.merchant.endpoint.model.entity.ErrorResponse;
import org.springframework.http.HttpStatus;

public class NotFoundException extends RestException {

    private static final long serialVersionUID = -4546342692615580312L;

    public NotFoundException() {
    }

    private String responseBodyCode;

    private ErrorResponse responseBody;

    public NotFoundException(String responseBodyCode) {
        this.responseBodyCode = responseBodyCode;
    }

    public NotFoundException(ErrorResponse responseBody) {
        this.responseBody = responseBody;
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.NOT_FOUND;
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
