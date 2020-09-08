package com.ifood.auth.endpoint.Mapper;

import com.ifood.auth.endpoint.DTO.ApplicationUserDTO;
import com.ifood.core.entity.ApplicationUser;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ApplicationUserMapper {

    ApplicationUserMapper INSTANCE = Mappers.getMapper(ApplicationUserMapper.class);

    ApplicationUserDTO apllicationUserToApplicationUserDTO (ApplicationUser applicationUser);

    ApplicationUser ApplicationUserDTOToApllicationUser  (ApplicationUserDTO applicationUserDTO);

}
