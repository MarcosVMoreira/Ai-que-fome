package com.ifood.auth.endpoint.service;

import com.ifood.auth.endpoint.error.NotFoundException;
import com.ifood.auth.endpoint.error.UnprocessableEntityException;
import com.ifood.auth.endpoint.repository.ApplicationUserRepository;
import com.ifood.token.security.entity.ApplicationUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ApplicationUserService {

    Logger logger = LoggerFactory.getLogger(ApplicationUserService.class);

    ApplicationUserRepository applicationUserRepository;

    private static final String ADMIN = "ADMIN";

    @Autowired
    public ApplicationUserService(ApplicationUserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
    }

    public void getToken(String email) {
        applicationUserRepository.findByEmail(email).orElseThrow(NotFoundException::new);

        //gerar novo token pro usuário, caso o token nao esteja em cache
    }

    public void save(String email, String id) {
        logger.info("Criando nova entrada na base de dados...");

        //TODO gerar loginCode e envia-lo por email para o usuario
        //enquanto nao estou gerando por email, vou fixar aqui mesmo

        String loginCode = "$2a$10$LHMspKsOXxuQCOhvVXhsluy44OqVg7gTVkGhIMf1OKCr2xBO.Og6q";


        Optional<ApplicationUser> foundApplicationUser =
                applicationUserRepository.findByEmailIgnoreCaseContaining(email);

        if (foundApplicationUser.isPresent()) {
            logger.info("Email {} já existe na base de dados.", foundApplicationUser.get().getEmail());
            throw new UnprocessableEntityException("422.001");
        }

        ApplicationUser applicationUser = ApplicationUser.builder()
                .email(email)
                .role(ADMIN)
                .customerId(id)
                .loginCode(loginCode)
                .build();

        applicationUserRepository.save(applicationUser);

    }

}