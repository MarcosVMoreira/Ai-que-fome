package com.customer.customer.test;

import com.customer.customer.endpoint.error.ResourceNotFoundException;
import com.customer.customer.endpoint.model.DTO.AddressDTO;
import com.customer.customer.endpoint.model.entity.Address;
import com.customer.customer.endpoint.model.mapper.AddressMapper;
import com.customer.customer.endpoint.repository.AddressRepository;
import com.customer.customer.endpoint.service.AddressServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import javax.validation.ConstraintViolationException;
import java.util.List;

import static java.util.Arrays.asList;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@DataMongoTest
@ExtendWith(MockitoExtension.class)
public class AddressServiceTest {

    @Mock
    AddressRepository addressRepository;

    @Spy
    AddressMapper addressMapper = AddressMapper.INSTANCE;

    @InjectMocks
    AddressServiceImpl addressService;


    private final Address addressOne = new Address("addressId", "abc", "Rua Jasmim", 123L, "SP",
                        "Campinas", "Mansoes Sto Antonio", "Brasil", "12345678",
                        null, false, "", "");
    private final Address addressTwo = new Address("addressTwo", "def", "Rua Hermantino", 456L, "SP",
            "Campinas", "Taquaral", "Brasil", "87654321",
            null, false, "", "");

    private final Address addressThree = new Address("def", "Rua Assis", 456L, "MG",
            "Pcs de Caldas", "Centro", "Brasil", "87654321",
            null, false, "", "");

    @Test
    public void whenListAll_thenReturnCorrectData () {

        when(addressRepository.findAll()).
                thenReturn(asList(addressOne, addressTwo));

        List<AddressDTO> addressDTOList = addressService.listAll();

        assertEquals(2, addressDTOList.size());
    }

    @Test
    public void whenGetAddressById_thenReturnAddress() {

        when(addressRepository.findById(anyString())).
                thenReturn(java.util.Optional.of(addressOne));

        AddressDTO addressDTO = addressService.getAddressById("addressId");

        assertEquals("Rua Jasmim", addressDTO.getStreetName());
    }

    @Test
    public void whenGetAddressByAddressId_thenReturnAddress() {
        when(addressRepository.findByidCustomer(anyString())).
                thenReturn((asList(addressTwo, addressThree)));

        List<AddressDTO> addressDTO = addressService.getAddressByCustomerID("def");

        assertEquals(2, addressDTO.size());
    }

    @Test
    public void whenSaveAddress_thenPersistData() {
        when(addressRepository.save(any(Address.class))).
                thenReturn(addressOne);

        AddressDTO addressDTO = addressService.save(addressMapper.addressToAddressDTO(addressOne));

        assertEquals(addressDTO.getStreetName(), addressOne.getStreetName());
    }

    @Test
    public void whenUpdateAddress_thenUpdateData() {
        when(addressRepository.save(addressOne)).
                thenReturn(addressOne);

        AddressDTO addressDTO = addressService.
                update(addressOne.getId(), addressMapper.addressToAddressDTO(addressOne));

        assertEquals(addressDTO.getStreetName(), addressOne.getStreetName());
    }

    @Test
    public void whenVerifyIfAddressExistWithWrongId_thenReturnResourceNotFound() {

        Exception exception = assertThrows(
                ResourceNotFoundException.class,
                () -> addressService.verifyIfAddressExist("abc"));

        assertTrue(exception.getMessage().contains("Address not found for ID: abc"));

    }

}

