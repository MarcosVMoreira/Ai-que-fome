package com.ifood.auth.endpoint.handler;

import com.ifood.auth.endpoint.error.RestException;
import com.ifood.auth.endpoint.model.dto.ErrorResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
@RequiredArgsConstructor
public class RestExceptionHandler {

    private final MessageSource messageSource;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception exception) {
        log.error(exception.getMessage(), exception);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @ExceptionHandler(RestException.class)
    public ResponseEntity<Object> handleRestException(RestException restException) {
        log.error(restException.getMessage(), restException);
        if (restException.getResponseBodyCode() != null) {
            return ResponseEntity.status(restException.getStatus())
                    .body(ErrorResponseDTO.builder()
                            .code(restException.getResponseBodyCode())
                            .message(getMessage(restException.getResponseBodyCode()))
                            .build());
        }
        if (restException.getResponseBody() != null) {
            return ResponseEntity.status(restException.getStatus())
                    .body(restException.getResponseBody());
        }
        return ResponseEntity.status(restException.getStatus()).build();
    }

    private String getMessage(String code, Object... args) {
        return this.messageSource.getMessage(code, args, LocaleContextHolder.getLocale());
    }
}