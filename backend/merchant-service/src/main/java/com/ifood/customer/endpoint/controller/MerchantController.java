package com.ifood.customer.endpoint.controller;

import com.ifood.customer.endpoint.enumeration.MerchantTypeEnum;
import com.ifood.customer.endpoint.model.entity.AllowedPayment;
import com.ifood.customer.endpoint.model.entity.Category;
import com.ifood.customer.endpoint.model.entity.Merchant;
import com.ifood.customer.endpoint.model.entity.SKU;
import com.ifood.customer.endpoint.service.MerchantService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.util.List;

@RestController
@Validated
@RequestMapping("merchants")
@RequiredArgsConstructor
public class MerchantController {

    private final MerchantService merchantService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<Merchant> listAll(Pageable pageable) {
        return new PageImpl<>(merchantService.listAll(pageable));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> save(@Valid @RequestBody Merchant merchant,
                                     UriComponentsBuilder componentsBuilder) {
        return ResponseEntity.created(componentsBuilder.path("merchant/merchants/{id}").
                buildAndExpand(merchantService.save(merchant).getId()).toUri()).build();
    }

    @GetMapping("email/{email}")
    @ResponseStatus(HttpStatus.OK)
    public Merchant getMerchantByEmail(@PathVariable String email) {
        return merchantService.getMerchantByEmail(email);
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public Merchant getMerchantById(@PathVariable String id) {
        return merchantService.getMerchantById(id);
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public Merchant update(@Valid @RequestBody Merchant merchant, @PathVariable String id) {
        return merchantService.update(merchant, id);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        merchantService.delete(id);
    }

    /* Allowed Payments */

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/{merchantId}/allowed-payment")
    public Merchant saveAllowedPayment(@PathVariable String merchantId,
                                                   @Valid @RequestBody List<AllowedPayment> allowedPayment) {
        return merchantService.updateAllowedPayment(merchantId, allowedPayment);
    }

    /* Category */

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/{merchantId}/category")
    public Merchant saveCategory(@PathVariable String merchantId,
                                                   @Valid @RequestBody List<Category> category) {
        return merchantService.updateCategory(merchantId, category);
    }

    /* SKU */

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/{merchantId}/sku")
    public Merchant saveSKU(@PathVariable String merchantId,
                                             @Valid @RequestBody List<SKU> sku) {
        return merchantService.updateSKU(merchantId, sku);
    }

    /* Merchant Type */

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/{merchantId}/merchant-type")
    public Merchant saveMerchantType(@PathVariable String merchantId,
                            @Valid @RequestBody List<MerchantTypeEnum> merchantTypeEnums) {
        return merchantService.updateMerchantType(merchantId, merchantTypeEnums);
    }

}

