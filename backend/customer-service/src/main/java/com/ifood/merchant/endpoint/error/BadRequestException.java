package com.ifood.merchant.endpoint.error;

import com.ifood.merchant.endpoint.model.dto.ErrorResponseDTO;
import org.springframework.http.HttpStatus;

public class BadRequestException extends RestException {

    private static final long serialVersionUID = -6522585356980537304L;

    private String responseBodyCode;

    private ErrorResponseDTO responseBody;

    public BadRequestException (String responseBodyCode) {
        this.responseBodyCode = responseBodyCode;
    }

    public BadRequestException (ErrorResponseDTO responseBody) {
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
    public ErrorResponseDTO getResponseBody() {
        return responseBody;
    }

}