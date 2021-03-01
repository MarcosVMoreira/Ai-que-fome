package com.ifood.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@SpringBootApplication
@EnableZuulProxy
//@EnableEurekaClient
//@ComponentScan("com.ifood")
//@EnableConfigurationProperties(value = JwtConfiguration.class)
public class GatewayApplication {

    public static void main (String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }

}
