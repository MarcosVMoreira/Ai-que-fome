package com.ifood.token.security.util;

import com.ifood.token.security.entity.ApplicationUser;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Slf4j
public class SecurityContextUtil {

    private SecurityContextUtil () {

    }

    public static void setSecurityContext(SignedJWT signedJWT) {
        try {
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
            String email = claims.getSubject();
            if (email == null) {
                throw new JOSEException("Username missing from JWT");
            }
            List<String> authorities = claims.getStringListClaim("authorities");
            ApplicationUser applicationUser = ApplicationUser
                    .builder()
                    .id(claims.getStringClaim("userId"))
                    .email(email)
                    .role(String.join(",", authorities))
                    .build();

            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(applicationUser, null, createAuthorities(authorities));

            auth.setDetails(signedJWT.serialize());

            SecurityContextHolder.getContext().setAuthentication(auth);

        } catch (Exception e) {
            log.error("Error setting security context: ", e);
            SecurityContextHolder.clearContext();
        }
    }

    private static List<SimpleGrantedAuthority> createAuthorities (List<String> authorities) {
        return authorities
                .stream()
                .map(SimpleGrantedAuthority::new)
                .collect(toList());
    }


}
