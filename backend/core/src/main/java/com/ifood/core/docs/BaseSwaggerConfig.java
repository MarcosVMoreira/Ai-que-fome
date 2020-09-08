package com.ifood.core.docs;


import org.springframework.context.annotation.Bean;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.security.Principal;

public class BaseSwaggerConfig {

    private final String basePackage;

    public BaseSwaggerConfig (String basePackage) {
        this.basePackage = basePackage;
    }

    @Bean
    public Docket api () {
        return new Docket(DocumentationType.SWAGGER_2)
                .ignoredParameterTypes(Principal.class)
                .select()
                .apis(RequestHandlerSelectors.basePackage(basePackage))
                .build()
                .apiInfo(metaData());
    }

    private ApiInfo metaData () {

        return new ApiInfoBuilder()
                .title("Awesome endpoints build for our delivery app frontend.")
                .description("Proceed with caution, coz there may be some bugs")
                .version("1.0")
                .contact(new Contact("Marcos Moreira as backend dev",
                        "https://www.linkedin.com/in/marcosviniciusmoreira/",
                        "contato.marcosvmoreira@gmail.com"))
                .license("Thats free stuff. Don't worry about license. Just give us some credits.")
                .build();
    }

}
