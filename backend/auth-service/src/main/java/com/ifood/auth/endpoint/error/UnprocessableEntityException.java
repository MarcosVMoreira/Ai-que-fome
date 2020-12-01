package com.ifood.auth.endpoint.error;

import com.ifood.auth.endpoint.model.dto.ErrorResponseDTO;
import org.springframework.http.HttpStatus;

public class UnprocessableEntityException extends RestException {

    private static final long serialVersionUID = -6522585356980537304L;

    private String responseBodyCode;

    private ErrorResponseDTO responseBody;

    public UnprocessableEntityException(String responseBodyCode) {
        this.responseBodyCode = responseBodyCode;
    }

    public UnprocessableEntityException(ErrorResponseDTO responseBody) {
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
    public ErrorResponseDTO getResponseBody() {
        return responseBody;
    }

}