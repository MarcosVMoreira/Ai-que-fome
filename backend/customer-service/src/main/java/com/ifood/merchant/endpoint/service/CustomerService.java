package com.ifood.merchant.endpoint.service;

import com.ifood.merchant.endpoint.model.dto.AddressDTO;
import com.ifood.merchant.endpoint.model.dto.CustomerDTO;
import com.ifood.merchant.endpoint.model.entity.MerchantRate;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;

public interface CustomerService {

    List<CustomerDTO> listAll (Pageable pageable);

    CustomerDTO getCustomerById (@PathVariable("id") String id);

    CustomerDTO findCustomerByEmail (@PathVariable String email);

    CustomerDTO save (@Valid @RequestBody CustomerDTO customer);

    void delete (@PathVariable String id);

    CustomerDTO update (CustomerDTO customerDTO, String id);

    List<String> saveAddress (String idCustomer, @Valid @RequestBody AddressDTO address);

    List<AddressDTO> listAllAddress (String idCustomer);

    AddressDTO getAddressById (String idCustomer, String idAddress);

    CustomerDTO updateAddress (String idCustomer, String idAddress, @Valid @RequestBody AddressDTO address);

    void deleteAddress (String idCustomer, String idAddress);

    CustomerDTO saveRate (String idCustomer, @Valid @RequestBody MerchantRate merchantRate);
}
