package com.customer.customer.test;

import com.customer.customer.endpoint.model.DTO.AddressDTO;
import com.customer.customer.endpoint.model.entity.Address;
import com.customer.customer.endpoint.model.mapper.AddressMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
public class AddressMapperTest {

    private AddressMapper addressMapper = AddressMapper.INSTANCE;

    private final Address address = new Address("abcd", "Rua Jasmim", 123L, "SP",
            "Campinas", "Mansoes Sto Antonio", "Brasil", "12345666",
            null, false, "", "");

    @Test
    public void whenAddressToAdressDTO_shouldConvertToDTO () {

        AddressDTO addressDTO = addressMapper.addressToAddressDTO(address);

        assertEquals("abcd", addressDTO.getIdCustomer());
        assertEquals("Rua Jasmim", addressDTO.getStreetName());
        assertEquals(123L, addressDTO.getStreetNumber());
        assertEquals("SP", addressDTO.getDistrict());
        assertEquals("Campinas", addressDTO.getCity());
        assertEquals("Mansoes Sto Antonio", addressDTO.getNeighborhood());
        assertEquals("Brasil", addressDTO.getCountry());
        assertEquals("12345666", addressDTO.getPostalCode());
        assertNull(addressDTO.getCoordinates());
        assertFalse(addressDTO.isFavorite());
        assertEquals("", addressDTO.getComplement());
        assertEquals("", addressDTO.getRefPoint());
    }

}
