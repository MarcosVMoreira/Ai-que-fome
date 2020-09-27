package com.ifood.auth.endpoint.model.mapper;

import com.ifood.auth.endpoint.model.dto.ApplicationUserDTO;
import com.ifood.token.security.entity.ApplicationUser;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ApplicationUserMapper {

    ApplicationUserMapper INSTANCE = Mappers.getMapper(ApplicationUserMapper.class);

    ApplicationUserDTO apllicationUserToApplicationUserDTO (ApplicationUser applicationUser);

    ApplicationUser ApplicationUserDTOToApllicationUser  (ApplicationUserDTO applicationUserDTO);

}
