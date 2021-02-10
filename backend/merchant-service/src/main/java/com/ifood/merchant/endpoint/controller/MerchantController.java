<<<<<<< HEAD:backend/merchant-service/src/main/java/com/ifood/merchant/endpoint/controller/MerchantController.java
=======
<<<<<<< HEAD:backend/merchant-service/src/main/java/com/ifood/merchant/endpoint/controller/MerchantController.java
=======
<<<<<<< HEAD:backend/merchant-service/src/main/java/com/ifood/merchant/endpoint/controller/MerchantController.java
>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682:backend/merchant-service/src/main/java/com/ifood/customer/endpoint/controller/MerchantController.java
>>>>>>> 78be23350b70b2e90459fecaa93e25c1b658de6b:backend/merchant-service/src/main/java/com/ifood/customer/endpoint/controller/MerchantController.java
package com.ifood.merchant.endpoint.controller;

import com.ifood.merchant.endpoint.enumeration.AllowedPaymentEnum;
import com.ifood.merchant.endpoint.enumeration.MerchantTypeEnum;
import com.ifood.merchant.endpoint.model.entity.Category;
import com.ifood.merchant.endpoint.model.entity.FindDistanceResponse;
import com.ifood.merchant.endpoint.model.entity.Merchant;
import com.ifood.merchant.endpoint.model.entity.SKU;
import com.ifood.merchant.endpoint.service.MerchantService;
<<<<<<< HEAD:backend/merchant-service/src/main/java/com/ifood/merchant/endpoint/controller/MerchantController.java
=======
<<<<<<< HEAD:backend/merchant-service/src/main/java/com/ifood/merchant/endpoint/controller/MerchantController.java
=======
=======
package com.ifood.customer.endpoint.controller;

import com.ifood.customer.endpoint.enumeration.AllowedPaymentEnum;
import com.ifood.customer.endpoint.enumeration.MerchantTypeEnum;
import com.ifood.customer.endpoint.model.entity.Category;
import com.ifood.customer.endpoint.model.entity.FindDistanceResponse;
import com.ifood.customer.endpoint.model.entity.Merchant;
import com.ifood.customer.endpoint.model.entity.SKU;
import com.ifood.customer.endpoint.service.MerchantService;
>>>>>>> ea1da27764fdd5fab48aaa0ba609a94f47206181:backend/merchant-service/src/main/java/com/ifood/customer/endpoint/controller/MerchantController.java
>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682:backend/merchant-service/src/main/java/com/ifood/customer/endpoint/controller/MerchantController.java
>>>>>>> 78be23350b70b2e90459fecaa93e25c1b658de6b:backend/merchant-service/src/main/java/com/ifood/customer/endpoint/controller/MerchantController.java
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@Validated
@RequestMapping("merchants")
@RequiredArgsConstructor
public class MerchantController {

    private final MerchantService merchantService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
<<<<<<< HEAD:backend/merchant-service/src/main/java/com/ifood/merchant/endpoint/controller/MerchantController.java
=======
<<<<<<< HEAD:backend/merchant-service/src/main/java/com/ifood/merchant/endpoint/controller/MerchantController.java
=======
<<<<<<< HEAD:backend/merchant-service/src/main/java/com/ifood/merchant/endpoint/controller/MerchantController.java
>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682:backend/merchant-service/src/main/java/com/ifood/customer/endpoint/controller/MerchantController.java
>>>>>>> 78be23350b70b2e90459fecaa93e25c1b658de6b:backend/merchant-service/src/main/java/com/ifood/customer/endpoint/controller/MerchantController.java
    public Page<FindDistanceResponse> listAll(@RequestParam @NotNull(message = "400.003") String customerCoords,
                                              @RequestParam(required = false) String name,
                                              @RequestParam(required = false) String type,
                                              @RequestParam(required = false) String payment,
                                              @RequestParam(required = false) Float distance,
                                              @RequestParam(required = false) Float fee,
                                              Pageable pageable) {
        return new PageImpl<>(merchantService.listAll(pageable, customerCoords, name, type, payment,
                distance, fee));
<<<<<<< HEAD:backend/merchant-service/src/main/java/com/ifood/merchant/endpoint/controller/MerchantController.java
=======
<<<<<<< HEAD:backend/merchant-service/src/main/java/com/ifood/merchant/endpoint/controller/MerchantController.java
=======
=======
    public Page<FindDistanceResponse> listAll(@RequestParam @NotNull(message = "400.003") String customerCoords, Pageable pageable) {
        return new PageImpl<>(merchantService.listAll(pageable, customerCoords));
>>>>>>> ea1da27764fdd5fab48aaa0ba609a94f47206181:backend/merchant-service/src/main/java/com/ifood/customer/endpoint/controller/MerchantController.java
>>>>>>> 42b9f924f709c3ef06cfd3feb91a8670d7e9c682:backend/merchant-service/src/main/java/com/ifood/customer/endpoint/controller/MerchantController.java
>>>>>>> 78be23350b70b2e90459fecaa93e25c1b658de6b:backend/merchant-service/src/main/java/com/ifood/customer/endpoint/controller/MerchantController.java
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
    public Merchant getMerchantById(@RequestParam @NotNull(message = "400.003") String customerCoords, @PathVariable String id) {
        return merchantService.getMerchantById(customerCoords, id);
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
                                       @Valid @RequestBody List<AllowedPaymentEnum> allowedPaymentEnums) {
        return merchantService.updateAllowedPayment(merchantId, allowedPaymentEnums);
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
    @PutMapping("/{merchantId}/category/{categoryId}/sku")
    public Merchant saveSKU(@PathVariable String merchantId,
                            @PathVariable String categoryId,
                            @Valid @RequestBody List<SKU> sku) {
        return merchantService.updateSKU(merchantId, categoryId, sku);
    }

    /* Merchant Type */

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/{merchantId}/merchant-type")
    public Merchant saveMerchantType(@PathVariable String merchantId,
                                     @Valid @RequestBody List<MerchantTypeEnum> merchantTypeEnums) {
        return merchantService.updateMerchantType(merchantId, merchantTypeEnums);
    }
}