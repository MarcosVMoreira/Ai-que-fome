package com.ifood.customer.endpoint.controller;

import com.ifood.customer.endpoint.model.entity.Merchant;
import com.ifood.customer.endpoint.service.MerchantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;

@RestController
@RequestMapping("merchants")
@RequiredArgsConstructor
public class MerchantController {

    private final MerchantService merchantService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> save(@Valid @RequestBody Merchant merchant,
                                     UriComponentsBuilder componentsBuilder) {

        return ResponseEntity.created(componentsBuilder.path("merchant/merchants/{id}").
                buildAndExpand(merchantService.save(merchant).getId()).toUri()).build();

    }

}
