package com.ifood.customer.endpoint.controller;

import com.ifood.customer.endpoint.model.entity.AllowedPayment;
import com.ifood.customer.endpoint.model.entity.Category;
import com.ifood.customer.endpoint.model.entity.Merchant;
import com.ifood.customer.endpoint.service.MerchantService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @PostMapping("/{merchantId}/allowed-payment")
    public ResponseEntity<Void> saveAllowedPayment(@PathVariable String merchantId,
                                                   @Valid @RequestBody AllowedPayment allowedPayment,
                                                   UriComponentsBuilder componentsBuilder) {
        List<String> list = merchantService.saveAllowedPayment(merchantId, allowedPayment);
        return ResponseEntity.created(componentsBuilder.path("merchant/merchants/" + list.get(0) + "/allowed-payment/{id}").
                buildAndExpand(list.get(1)).toUri()).build();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{merchantId}/allowed-payment/{allowedPaymentId}")
    public AllowedPayment getAllowedPayment(@PathVariable String merchantId,
                                            @PathVariable String allowedPaymentId) {
        return merchantService.getAllowedPaymentById(merchantId, allowedPaymentId);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{merchantId}/allowed-payment/{allowedPaymentId}")
    public Merchant updateAllowedPayment(@PathVariable String merchantId,
                                         @PathVariable String allowedPaymentId,
                                         @Valid @RequestBody AllowedPayment allowedPayment) {
        return merchantService.updateAllowedPayment(merchantId, allowedPaymentId, allowedPayment);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{merchantId}/allowed-payment/{allowedPaymentId}")
    public void deleteAllowedPayment(@PathVariable String merchantId,
                                     @PathVariable String allowedPaymentId) {
        merchantService.deleteAllowedPayment(merchantId, allowedPaymentId);
    }

    /* Category */

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{merchantId}/category")
    public ResponseEntity<Void> saveCategory(@PathVariable String merchantId,
                                                   @Valid @RequestBody Category category,
                                                   UriComponentsBuilder componentsBuilder) {
        List<String> list = merchantService.saveCategory(merchantId, category);
        return ResponseEntity.created(componentsBuilder.path("merchant/merchants/" + list.get(0) + "/category/{id}").
                buildAndExpand(list.get(1)).toUri()).build();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{merchantId}/category/{categoryId}")
    public Category getCategory(@PathVariable String merchantId,
                                            @PathVariable String categoryId) {
        return merchantService.getCategoryById(merchantId, categoryId);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{merchantId}/category/{categoryId}")
    public Merchant updateCategory(@PathVariable String merchantId,
                                         @PathVariable String categoryId,
                                         @Valid @RequestBody Category category) {
        return merchantService.updateCategory(merchantId, categoryId, category);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{merchantId}/category/{categoryId}")
    public void deleteCategory(@PathVariable String merchantId,
                                     @PathVariable String categoryId) {
        merchantService.deleteCategory(merchantId, categoryId);
    }
}
