package com.customer.customer;

import com.customer.customer.endpoint.model.DTO.AddressDTO;
import com.customer.customer.endpoint.model.entity.Address;
import com.customer.customer.endpoint.model.mapper.AddressMapper;
import com.customer.customer.endpoint.repository.AddressRepository;
import com.customer.customer.endpoint.service.AddressServiceImpl;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import java.util.List;

import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@DataMongoTest
@ExtendWith(MockitoExtension.class)
public class AddressServiceTest {

    @Mock
     AddressRepository addressRepository;

     AddressServiceImpl addressService;

    private final Address addressOne = new Address("addressId", "abc", "Rua Jasmim", 123L, "SP",
                        "Campinas", "Mansoes Sto Antonio", "Brasil", "12345678",
                        null, false, "", "");
    private final Address addressTwo = new Address("def", "Rua Hermantino", 456L, "SP",
            "Campinas", "Taquaral", "Brasil", "87654321",
            null, false, "", "");

    @Before
    public void setUp() {

        System.out.println("testando");

        addressService = new AddressServiceImpl(AddressMapper.INSTANCE, addressRepository);
    }

    @Test
    public void whenListAll_thenReturnCorrectData () {

        when(addressRepository.findAll()).
                thenReturn(asList(addressOne, addressTwo));

        List<AddressDTO> addressDTOList = addressService.listAll();

        assertEquals(3, addressDTOList.size());
    }

    @Test
    public void whenGetAddressById_thenReturnAddress() {

        when(addressRepository.findById("addressId")).
                thenReturn(java.util.Optional.of(addressOne));

        AddressDTO addressDTO = addressService.getAddressById("addressId");

        assertEquals("Rua Jasmim", addressDTO.getStreetName());
    }

//    @Test
//    public void whenGetAddressByCustomerId_thenReturnAddress() {
//
//        when(addressRepository.findById("addressId")).
//                thenReturn(java.util.Optional.of(addressOne));
//
//        System.out.println(addressService.listAll());
//
//        List<AddressDTO> addressDTO = addressService.getAddressByCustomerID("def");
//
//        assertEquals(1, addressDTO.size());
//    }


}
