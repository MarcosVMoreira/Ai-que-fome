package com.ifood.auth.endpoint.controller;

import com.ifood.auth.endpoint.DTO.ApplicationUserDTO;
import com.ifood.auth.endpoint.Mapper.ApplicationUserMapper;
import com.ifood.core.entity.ApplicationUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("user")
public class UserInfoController {

    @Autowired
    private ApplicationUserMapper applicationUserMapper;

    @GetMapping("info")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationUserDTO getUserInfo(Principal principal) {
        return applicationUserMapper.apllicationUserToApplicationUserDTO(
                (ApplicationUser) ((UsernamePasswordAuthenticationToken) principal).getPrincipal());
    }

}
