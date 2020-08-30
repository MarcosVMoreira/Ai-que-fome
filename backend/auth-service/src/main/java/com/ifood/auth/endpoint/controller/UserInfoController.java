package com.ifood.auth.endpoint.controller;

import com.ifood.auth.endpoint.DTO.ApplicationUserDTO;
import com.ifood.auth.endpoint.Mapper.ApplicationUserMapper;
import com.ifood.core.entity.ApplicationUser;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("user")
@Api(value = "Endpoints to manage user's information.")
public class UserInfoController {

    @Autowired
    private ApplicationUserMapper applicationUserMapper;

    @GetMapping("info")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Retrieve user information available on token",
            response = ApplicationUserDTO[].class,
            produces = "application/json")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "token", dataType = "String", paramType = "header",
                    value = "Token obtained from /auth/login. Use HTTP \"Authorization\" header.")
    })
    public ApplicationUserDTO getUserInfo(Principal principal) {
        return applicationUserMapper.apllicationUserToApplicationUserDTO(
                (ApplicationUser) ((UsernamePasswordAuthenticationToken) principal).getPrincipal());
    }

}
