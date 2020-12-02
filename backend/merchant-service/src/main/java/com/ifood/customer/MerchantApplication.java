package com.ifood.customer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;

import java.util.stream.Stream;

@SpringBootApplication
@ComponentScan("com.ifood")
@EnableEurekaClient
@Slf4j
@EnableConfigurationProperties(value = JwtConfiguration.class)
public class MerchantApplication implements ApplicationRunner {

    public static void main (String[] args) {
        SpringApplication.run(MerchantApplication.class, args);
    }

    @Override
    public void run (ApplicationArguments applicationArguments) throws Exception {
        log.info("--------------------- Application Arguments ---------------------");
        Stream.of(applicationArguments.getSourceArgs()).forEach(log::info);
        log.info("--------------------- Application Arguments ---------------------");
        log.info("MS Customer successfully started!");
    }
}

