package com.ifood.customer.endpoint.repository;

import com.ifood.customer.endpoint.model.entity.Merchant;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomMerchantRepository {

    List<Merchant> findByNameAndCity(Pageable pageable, String name, String city);
}

//categoria, custo de entrega, tipo de pagamento, distancia e pelo nome