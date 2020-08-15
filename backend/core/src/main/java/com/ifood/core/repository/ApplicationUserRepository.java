package com.ifood.core.repository;

import com.ifood.core.entity.ApplicationUser;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ApplicationUserRepository extends PagingAndSortingRepository<ApplicationUser, String> {

    ApplicationUser findByEmail (String email);

}
