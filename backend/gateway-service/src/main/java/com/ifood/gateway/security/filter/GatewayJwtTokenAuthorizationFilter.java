package com.ifood.gateway.security.filter;

import com.ifood.core.property.JwtConfiguration;
import com.ifood.token.security.filter.JwtTokenAuthorizationFilter;
import com.ifood.token.security.token.converter.TokenConverter;
import com.netflix.zuul.context.RequestContext;
import com.nimbusds.jwt.SignedJWT;
import lombok.SneakyThrows;
import org.springframework.lang.NonNull;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.ifood.token.security.util.SecurityContextUtil.setSecurityContext;

public class GatewayJwtTokenAuthorizationFilter extends JwtTokenAuthorizationFilter {
    public GatewayJwtTokenAuthorizationFilter (JwtConfiguration jwtConfiguration, TokenConverter tokenConverter) {
        super(jwtConfiguration, tokenConverter);
    }

    @Override
    @SneakyThrows
    @SuppressWarnings("duplicates")
    protected void doFilterInternal (@NonNull HttpServletRequest httpServletRequest, @NonNull HttpServletResponse httpServletResponse, @NonNull FilterChain filterChain) throws ServletException, IOException {
        String header = httpServletRequest.getHeader(jwtConfiguration.getHeader().getName());

        if (header == null || !header.startsWith(jwtConfiguration.getHeader().getPrefix())) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        }

        String token = header.replace(jwtConfiguration.getHeader().getPrefix(), "").trim();

        String signedToken = tokenConverter.decryptToken(token);

        tokenConverter.validateTokenSignature(signedToken);

        setSecurityContext(SignedJWT.parse(signedToken));

        if(jwtConfiguration.getType().equalsIgnoreCase("signed")) {
            RequestContext.getCurrentContext().addZuulRequestHeader("Authorization", jwtConfiguration.getHeader().getPrefix() + signedToken);
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);

    }

}
