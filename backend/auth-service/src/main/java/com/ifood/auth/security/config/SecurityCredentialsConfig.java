package com.ifood.auth.security.config;

import com.ifood.auth.security.filter.JwtUsernameAndPasswordAuthenticationFilter;
import com.ifood.core.property.JwtConfiguration;
import com.ifood.token.security.config.SecurityTokenConfig;
import com.ifood.token.security.token.creator.TokenCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@EnableWebSecurity
public class SecurityCredentialsConfig extends SecurityTokenConfig {

    @Qualifier("userDetailsServiceImpl")
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TokenCreator tokenCreator;

    public SecurityCredentialsConfig (JwtConfiguration jwtConfiguration, @Qualifier("userDetailsServiceImpl") UserDetailsService userDetailsService, TokenCreator tokenCreator) {
        super(jwtConfiguration);
        this.userDetailsService = userDetailsService;
        this.tokenCreator = tokenCreator;
    }

    @Override
    protected void configure (HttpSecurity http) throws Exception {
        http
                .addFilter(new JwtUsernameAndPasswordAuthenticationFilter(authenticationManager(), jwtConfiguration, tokenCreator));
        super.configure(http);
    }

    @Override
    protected void configure (AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder () {
        return new BCryptPasswordEncoder();
    }

}
