package com.ifood.gateway;

import com.ifood.core.property.JwtConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableZuulProxy
@EnableEurekaClient
@ComponentScan("com.ifood")
@EnableConfigurationProperties(value = JwtConfiguration.class)
public class GatewayApplication {

    public static void main (String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }

}
