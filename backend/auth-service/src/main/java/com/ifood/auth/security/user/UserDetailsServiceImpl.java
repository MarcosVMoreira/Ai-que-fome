package com.ifood.auth.security.user;

import com.ifood.core.entity.ApplicationUser;
import com.ifood.core.repository.ApplicationUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.Collection;

@Service
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    @Override
    public UserDetails loadUserByUsername (String email) throws UsernameNotFoundException {

        ApplicationUser applicationUser = applicationUserRepository.findByEmail(email);

        if (applicationUser == null) {
            throw new UsernameNotFoundException(String.format("Application user '%s' not found", email));
        }

        return new CustomUserDetails(applicationUser);
    }

    private static final class CustomUserDetails extends ApplicationUser implements UserDetails {

        public CustomUserDetails (@NotNull ApplicationUser applicationUser) {
            super(applicationUser);
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities () {
            return AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_");
        }

        @Override
        public String getPassword () {
            return null;
        }

        @Override
        public String getUsername () {
            return null;
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
