package com.ifood.customer;

import com.ifood.core.property.JwtConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@ComponentScan("com.ifood")
@EntityScan({"com.ifood.core.entity"})
@EnableMongoRepositories({"com.ifood.core.repository"})
@EnableEurekaClient
@EnableConfigurationProperties(value = JwtConfiguration.class)
public class CustomerApplication {

    public static void main (String[] args) {
        SpringApplication.run(CustomerApplication.class, args);
    }

}
