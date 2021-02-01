package com.ifood.merchant.endpoint.error;

import com.ifood.merchant.endpoint.model.dto.ErrorResponseDTO;
import org.springframework.http.HttpStatus;

public abstract class RestException extends RuntimeException {

    private static final long serialVersionUID = -6635290010904547786L;

    public abstract HttpStatus getStatus();

    public RestException() {
        super();
    }

    public RestException(String message) {
        super(message);
    }

    /**
     * If an exception has a properties mapped response body code and message, it must override this method. If it has a runtime customized response
     * body, override this method {@link RestException#getResponseBody() getResponseBody}.
     *
     * @return response body code
     */
    public String getResponseBodyCode() {
        return null;
    }

    /**
     * If an exception has a runtime customized response body, it must override this method. If it has a properties mapped response body code and
     * message, override the method {@link RestException#getResponseBodyCode() getResponseBodyCode}.
     *
     * @return response body
     */
    public ErrorResponseDTO getResponseBody() {
        return null;
    }

}
