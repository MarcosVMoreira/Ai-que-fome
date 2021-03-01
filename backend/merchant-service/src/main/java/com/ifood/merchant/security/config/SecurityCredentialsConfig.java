//package com.ifood.merchant.security.config;
//
//import com.ifood.core.property.JwtConfiguration;
//import com.ifood.token.security.config.SecurityTokenConfig;
//import com.ifood.token.security.filter.JwtTokenAuthorizationFilter;
//import com.ifood.token.security.token.converter.TokenConverter;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@EnableWebSecurity
//public class SecurityCredentialsConfig extends SecurityTokenConfig {
//
//    @Autowired
//    private TokenConverter tokenConverter;
//
//    public SecurityCredentialsConfig(JwtConfiguration jwtConfiguration) {
//        super(jwtConfiguration);
//    }
//
//    @Override
//    protected void configure (HttpSecurity http) throws Exception {
//        http
//                .addFilterAfter(new JwtTokenAuthorizationFilter(jwtConfiguration, tokenConverter),
//                        UsernamePasswordAuthenticationFilter.class);
//        super.configure(http);
//    }
//
//}
