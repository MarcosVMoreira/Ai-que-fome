package com.customer.customer;

import com.customer.customer.endpoint.DTO.Address;
import com.customer.customer.endpoint.DTO.Customer;
import com.customer.customer.endpoint.error.ResourceNotFoundException;
import com.customer.customer.endpoint.repository.AddressRepository;
import com.customer.customer.endpoint.service.AddressServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@Transactional
@ExtendWith(MockitoExtension.class)
@DataJpaTest
public class AddressServiceTest {

    @InjectMocks
    private AddressServiceImpl addressService;

    @Mock
    private AddressRepository addressRepository;

    @Test
    public void whenListAll_thenReturnCorrectData () {

        Address address1 = new Address(0L, "London street", 123L,
                "", "next do Paris", true);
        Address address2 = new Address(1L, "New york street", 321L,
                "", "next do some NY place", false);

        when(addressRepository.findAll()).
                thenReturn(asList(address1, address2));

        assertThat(addressService.listAll()).isSameAs(addressRepository.findAll());
    }

    @Test
    public void whenFindAddressById_thenReturnAddress() {
        Address address1 = new Address(1L, "London street", 123L,
                "", "next do Paris", true);

        Address address2 = new Address(1L, "Paris street", 1234L,
                "ap 30", "next do London", false);

        when(addressRepository.findById(1L)).
                thenReturn(java.util.Optional.of(address2));

        assertThat(addressService.getAddressById(1L)).isSameAs(addressRepository.findById(1L));
    }

    @Test
    public void whenFindAddressByCustomerId_thenReturnAddress() {
        Address address1 = new Address(1L, "London street", 123L,
                "", "next do Paris", true);

        Address address2 = new Address(1L, "Paris street", 1234L,
                "ap 30", "next do London", false);

        when(addressRepository.findByidCustomer(1L)).
                thenReturn(asList(address1, address2));

        assertThat(addressService.findAddressByCustomerID(1L)).isSameAs(addressRepository.findByidCustomer(1L));
    }


    @Test
    public void whenDeleteOutputUsingWrongId_thenReturnResourceNotFoundException () {
        Exception exception = assertThrows(
                ResourceNotFoundException.class,
                () -> addressService.deleteOutput(1L));

        assertTrue(exception.getMessage().contains("Address not found for ID: 1"));
    }

    @Test
    public void whenUpdateOutputUsingWrongId_thenReturnResourceNotFoundException () {
        Address address = new Address(1L, 1L, "London street", 123L,
                "123", "next do Paris", true);

        Exception exception = assertThrows(
                ResourceNotFoundException.class,
                () -> addressService.updateOutput(address));

        assertTrue(exception.getMessage().contains("Address not found for ID: 1"));

    }

    @Test
    public void whenDeleteInputUsingWrongId_thenReturnResourceNotFoundException () {
        Exception exception = assertThrows(
                ResourceNotFoundException.class,
                () -> addressService.deleteInput(1L));

        assertTrue(exception.getMessage().contains("Address not found for ID: 1"));
    }

    @Test
    public void whenUpdateInputUsingWrongId_thenReturnResourceNotFoundException () {
        Address address = new Address(1L, 1L, "London street", 123L,
                "123", "next do Paris", true);

        Exception exception = assertThrows(
                ResourceNotFoundException.class,
                () -> addressService.updateInput(address));

        assertTrue(exception.getMessage().contains("Address not found for ID: 1"));
    }


    @Test
    public void whenVerifyIfCustomerHasAddressUsingWrongId_thenReturnResourceNotFoundException () {
        Exception exception = assertThrows(
                ResourceNotFoundException.class,
                () -> addressService.verifyIfCustomerHasAddress(1L));

        assertTrue(exception.getMessage().contains("Address not found for customer ID: 1"));
    }

    @Test
    public void whenVerifyIfAddressExistsUsingWrongId_thenReturnResourceNotFoundException () {
        Exception exception = assertThrows(
                ResourceNotFoundException.class,
                () -> addressService.verifyIfAddressExist(1L));

        assertTrue(exception.getMessage().contains("Address not found for ID: 1"));
    }
}
