package com.ifood.auth;

import com.ifood.core.property.JwtConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableEurekaClient
@EnableConfigurationProperties(value = JwtConfiguration.class)
@EnableMongoRepositories({"com.ifood.auth.endpoint.repository"})
@EntityScan({"com.ifood.token.security.entity"})
@ComponentScan("com.ifood")
public class AuthApplication {

    public static void main (String[] args) {
        SpringApplication.run(AuthApplication.class, args);
    }

}
