//package com.ifood.gateway.security.config;
//
//import com.ifood.core.property.JwtConfiguration;
//import com.ifood.gateway.security.filter.GatewayJwtTokenAuthorizationFilter;
//import com.ifood.token.security.config.SecurityTokenConfig;
//import com.ifood.token.security.token.converter.TokenConverter;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@EnableWebSecurity
//public class SecurityConfig extends SecurityTokenConfig {
//
//    private TokenConverter tokenConverter;
//
//    public SecurityConfig (JwtConfiguration jwtConfiguration, TokenConverter tokenConverter) {
//        super(jwtConfiguration);
//        this.tokenConverter = tokenConverter;
//    }
//
//
//    @Override
//    protected void configure (HttpSecurity http) throws Exception {
//        http.addFilterAfter(new GatewayJwtTokenAuthorizationFilter(jwtConfiguration, tokenConverter), UsernamePasswordAuthenticationFilter.class);
//        super.configure(http);
//    }
//
//}
