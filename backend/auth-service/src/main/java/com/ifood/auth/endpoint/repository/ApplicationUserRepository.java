package com.ifood.auth.endpoint.repository;


import com.ifood.token.security.entity.ApplicationUser;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationUserRepository extends PagingAndSortingRepository<ApplicationUser, String> {

    Optional<ApplicationUser> findByEmail (String email);

}
