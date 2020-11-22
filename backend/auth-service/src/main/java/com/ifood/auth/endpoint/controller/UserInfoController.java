package com.ifood.auth.endpoint.controller;

import com.ifood.auth.endpoint.model.dto.ApplicationUserDTO;
import com.ifood.auth.endpoint.model.mapper.ApplicationUserMapper;
import com.ifood.auth.endpoint.service.ApplicationUserService;
import com.ifood.token.security.entity.ApplicationUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("user")
public class UserInfoController {

    private ApplicationUserMapper applicationUserMapper;
    private ApplicationUserService applicationUserService;

    @Autowired
    public UserInfoController (ApplicationUserMapper applicationUserMapper, ApplicationUserService applicationUserService) {
        this.applicationUserMapper = applicationUserMapper;
        this.applicationUserService = applicationUserService;
    }

    @GetMapping("info")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationUserDTO getUserInfo (Principal principal) {
        return applicationUserMapper.apllicationUserToApplicationUserDTO(
                (ApplicationUser) ((UsernamePasswordAuthenticationToken) principal).getPrincipal());
    }

    @GetMapping("token/{email}")
    @ResponseStatus(HttpStatus.OK)
    public void getToken (@PathVariable String email) {
        applicationUserService.getToken(email);
    }


    //TODO Criar aqui endpoint pra salvar usuário

}