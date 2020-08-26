package com.ifood.auth.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ifood.core.entity.ApplicationUser;
import com.ifood.core.property.JwtConfiguration;
import com.ifood.token.security.token.creator.TokenCreator;
import com.nimbusds.jwt.SignedJWT;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static java.util.Collections.emptyList;

@Slf4j
@AllArgsConstructor
public class JwtUsernameAndPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtConfiguration jwtConfiguration;

    @Autowired
    private TokenCreator tokenCreator;

    @Override
    @SneakyThrows
    public Authentication attemptAuthentication (HttpServletRequest request, HttpServletResponse response) {
        ApplicationUser applicationUser = new ObjectMapper().readValue(request.getInputStream(), ApplicationUser.class);

        if (applicationUser == null) {
            throw new UsernameNotFoundException("Unable to retrieve the username or password");
        }

        log.info("Creating the authentication object for the user '{}' and calling UserDetailServiceImpl loadUserByUsername", applicationUser.getEmail());

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(applicationUser.getEmail(), applicationUser.getLoginCode(), emptyList());

        usernamePasswordAuthenticationToken.setDetails(applicationUser);

        return authenticationManager.authenticate(usernamePasswordAuthenticationToken);

    }

    @Override
    @SneakyThrows
    protected void successfulAuthentication (HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication auth) {
        log.info("Authentication was successful for the user '{}', generating JWE token", auth.getName());

        SignedJWT signedJWT = tokenCreator.createSignedJWT(auth);

        String encryptToken = tokenCreator.encryptToken(signedJWT);

        log.info("Token generated successfully, adding it to the response header.");

        response.addHeader("Access-Control-Expose-Headers", "XSRF-TOKEN, "+jwtConfiguration.getHeader().getName());

        response.addHeader(jwtConfiguration.getHeader().getName(), jwtConfiguration.getHeader().getPrefix() + encryptToken);


    }


}


