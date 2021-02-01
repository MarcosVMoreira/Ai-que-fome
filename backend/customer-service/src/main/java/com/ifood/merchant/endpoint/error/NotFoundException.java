package com.ifood.merchant.endpoint.error;

import org.springframework.http.HttpStatus;

public class NotFoundException extends RestException {

    private static final long serialVersionUID = -4546342692615580312L;

    public NotFoundException() {
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.NOT_FOUND;
    }

}
