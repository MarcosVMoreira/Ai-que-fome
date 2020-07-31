package com.ifood.customer.endpoint.handler;

import com.ifood.customer.endpoint.error.ErrorDetails;
import com.ifood.customer.endpoint.error.ResourceNotFoundDetails;
import com.ifood.customer.endpoint.error.ResourceNotFoundException;
import com.ifood.customer.endpoint.error.ValidationErrorDetails;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolationException;
import java.util.Date;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException (ResourceNotFoundException rfnException) {
        ResourceNotFoundDetails rnfDetails = ResourceNotFoundDetails.Builder
                .newBuilder()
                .timestamp(new Date().getTime())
                .status(HttpStatus.NOT_FOUND.value())
                .title("Resource not found")
                .detail(rfnException.getMessage())
                .developerMessage(rfnException.getClass().getName())
                .build();

        return new ResponseEntity<>(rnfDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolationException (ConstraintViolationException cveException) {

        String fieldError = cveException.getLocalizedMessage();

        ValidationErrorDetails cveDetails = ValidationErrorDetails.Builder
                .newBuilder()
                .timestamp(new Date().getTime())
                .status(HttpStatus.BAD_REQUEST.value())
                .title("Field validation error")
                .detail(fieldError)
                .developerMessage(cveException.getClass().getName())
                .build();

        return new ResponseEntity<>(cveDetails, HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal (Exception ex,
                                                              Object body,
                                                              HttpHeaders headers,
                                                              HttpStatus status,
                                                              WebRequest request) {

        ErrorDetails errorDetails =
                ErrorDetails.Builder
                        .newBuilder()
                        .timestamp(new Date().getTime())
                        .status(status.value())
                        .title("Internal Exception")
                        .detail(ex.getMessage())
                        .developerMessage(ex.getClass().getName())
                        .build();

        return new ResponseEntity<>(errorDetails, headers, status);
    }
}
