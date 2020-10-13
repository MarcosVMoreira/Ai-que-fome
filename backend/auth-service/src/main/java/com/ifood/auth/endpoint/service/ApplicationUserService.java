package com.ifood.auth.endpoint.service;

import com.ifood.auth.endpoint.error.NotFoundException;
import com.ifood.auth.endpoint.model.dto.TokenDTO;
import com.ifood.auth.endpoint.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationUserService {

    ApplicationUserRepository applicationUserRepository;

    @Autowired
    public ApplicationUserService(ApplicationUserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
    }

    public void getToken(String email) {
        applicationUserRepository.findByEmail(email).orElseThrow(NotFoundException::new);

        //gerar novo token pro usuário, caso o token nao esteja em cache
    }
}