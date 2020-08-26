package com.ifood.token.security.token.converter;

import com.ifood.core.property.JwtConfiguration;
import com.nimbusds.jose.JWEObject;
import com.nimbusds.jose.crypto.DirectDecrypter;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jwt.SignedJWT;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class TokenConverter {

    @Autowired
    private JwtConfiguration jwtConfiguration;

    @SneakyThrows
    public String decryptToken(String encryptedToken) {
        log.info("Decrypting token");

        JWEObject jweObject = JWEObject.parse(encryptedToken);

        DirectDecrypter directDecrypter = new DirectDecrypter(jwtConfiguration.getPrivateKey().getBytes());

        jweObject.decrypt(directDecrypter);

        log.info("Token Decrypted. Returning signed token...");

        return jweObject.getPayload().toSignedJWT().serialize();

    }

    @SneakyThrows
    public void validateTokenSignature (String signedToken) {
        log.info("Starting method to validate token signature...");

        SignedJWT signedJWT = SignedJWT.parse(signedToken);

        log.info("Token parsed! Retrieving public key from signed token.");

        RSAKey publicKey = RSAKey.parse(signedJWT.getHeader().getJWK().toJSONObject());

        log.info("Public key retrieved, validating signature...");

        if(!signedJWT.verify(new RSASSAVerifier(publicKey))) {
            throw new AccessDeniedException("Invalid token signatuire!");
        }

        log.info("The token has a valid signature.");

    }

}
