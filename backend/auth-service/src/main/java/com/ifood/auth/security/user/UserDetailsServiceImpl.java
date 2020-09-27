package com.ifood.auth.security.user;

import com.ifood.auth.endpoint.repository.ApplicationUserRepository;
import com.ifood.token.security.entity.ApplicationUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.Collection;

import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

@Service
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    @Override
    public UserDetails loadUserByUsername (String username) {
        log.info("Searching in database for user by username '{}'", username);
        ApplicationUser applicationUser = applicationUserRepository.findByEmail(username);
        log.info("ApplicationUser found '{}'", applicationUser);

        if (applicationUser == null) {
            throw new UsernameNotFoundException(String.format("Application user '%s' not found.", username));
        }

        return new CustomUserDetails(applicationUser);
    }

    private static final class CustomUserDetails extends ApplicationUser implements UserDetails {

        CustomUserDetails (@NotNull ApplicationUser applicationUser) {
            super(applicationUser);
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities () {
            return commaSeparatedStringToAuthorityList("ROLE_"+this.getRole());
        }

        @Override
        public String getPassword () {
            return this.getLoginCode();
        }

        @Override
        public String getUsername () {
            return this.getEmail();
        }

        @Override
        public boolean isAccountNonExpired () {
            return true;
        }

        @Override
        public boolean isAccountNonLocked () {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired () {
            return true;
        }

        @Override
        public boolean isEnabled () {
            return true;
        }
    }

}
