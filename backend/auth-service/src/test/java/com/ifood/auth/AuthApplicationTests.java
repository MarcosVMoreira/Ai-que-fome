package com.ifood.auth;

import com.ifood.core.entity.ApplicationUser;
import com.ifood.core.repository.ApplicationUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
class AuthApplicationTests {

    @Autowired
    ApplicationUserRepository applicationUserRepository;

    @Test
    void contextLoads () {

    }

    @Test
    public void gera () {
       // ApplicationUser applicationUser = new ApplicationUser("abcdteste",
        //        "email@gmail.com", "USER", "thatsacustomerid", "ifoodclone");
        System.out.println(new BCryptPasswordEncoder().encode("ifoodclone"));
       // applicationUserRepository.save(applicationUser);
    }

}
