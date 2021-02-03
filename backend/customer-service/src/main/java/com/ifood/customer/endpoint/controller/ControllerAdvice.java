package com.ifood.customer.endpoint.controller;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.ifood.customer.endpoint.error.NotFoundException;
import com.ifood.customer.endpoint.error.RestException;
import com.ifood.customer.endpoint.model.dto.ErrorResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.util.ObjectUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.validation.ConstraintViolationException;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ControllerAdvice {

    private final MessageSource messageSource;

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Object> handleNotFoundException (NotFoundException exception) {
        return new ResponseEntity<>(Collections.singletonList(ErrorResponseDTO.builder()
                .code("404.001")
                .message(getMessage("404.001", exception.getMessage())).build()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintViolationException
            (final ConstraintViolationException cve) {
        String msg = cve.getMessage();
        return new ResponseEntity<>(Collections.singletonList(ErrorResponseDTO.builder()
                .code("400.000")
                .message(getMessage("400.000", cve.getMessage())).build()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<Error> mediaTypeNotFoundException (final HttpMediaTypeNotSupportedException e) {
        return new ResponseEntity<>(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<List<ErrorResponseDTO>> assertionException (final HttpMessageNotReadableException e) {
        if (e.getCause() instanceof JsonMappingException) {
            JsonMappingException cause = (JsonMappingException) e.getCause();
            String field = cause.getPathReference().split("\\[\"")[1].replace("\"]", "");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonList(ErrorResponseDTO.builder()
                            .code("400.000")
                            .message(getMessage("400.000", field))
                            .build()));
        }
        return defaultBadRequestError();
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<List<ErrorResponseDTO>> missingServletRequestParameterException
            (final MissingServletRequestParameterException e) {
        return defaultBadRequestError();
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ErrorResponseDTO>> handleMethodArgumentNotValidException (
            MethodArgumentNotValidException methodArgumentNotValidException) {
        List<ErrorResponseDTO> messageErrors = Optional.ofNullable(methodArgumentNotValidException)
                .filter(argumentNotValidException -> !ObjectUtils
                        .isEmpty(argumentNotValidException.getBindingResult()))
                .map(MethodArgumentNotValidException::getBindingResult)
                .filter(bindingResult -> !ObjectUtils.isEmpty(bindingResult.getAllErrors()))
                .map(BindingResult::getAllErrors)
                .map(Stream::of)
                .orElseGet(Stream::empty)
                .flatMap(Collection::stream)
                .filter(objectError -> !ObjectUtils.isEmpty(objectError))
                .map(this::createError)
                .collect(Collectors.toList());
        return new ResponseEntity<>(messageErrors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException (Exception exception) {
        log.error(exception.getMessage(), exception);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<List<ErrorResponseDTO>> methodArgumentTypeMismatchException
            (final MethodArgumentTypeMismatchException e) {
        return new ResponseEntity<>(Collections.singletonList(ErrorResponseDTO.builder()
                .code("400.000")
                .message(getMessage("400.000", e.getName())).build()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RestException.class)
    public ResponseEntity<Object> handleRestException (RestException restException) {
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

    private ResponseEntity<List<ErrorResponseDTO>> defaultBadRequestError () {
        return new ResponseEntity<>(
                Collections.singletonList(ErrorResponseDTO.builder()
                        .code("400.000")
                        .message(getMessage("400.000"))
                        .build()),
                HttpStatus.BAD_REQUEST);
    }

    private ErrorResponseDTO createError (ObjectError error) {
        String field = "";
        if (error instanceof FieldError) {
            field = ((FieldError) error).getField();
        }
        return ErrorResponseDTO.builder()
                .code(error.getDefaultMessage())
                .message(getMessage(error.getDefaultMessage(), field))
                .build();
    }

    private String getMessage (String code, Object... args) {
        return this.messageSource.getMessage(code, args, LocaleContextHolder.getLocale());
    }
}