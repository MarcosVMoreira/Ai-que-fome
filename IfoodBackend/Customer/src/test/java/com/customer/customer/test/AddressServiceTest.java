package com.customer.customer;

import com.customer.customer.endpoint.entity.Address;
import com.customer.customer.endpoint.error.ResourceNotFoundException;
import com.customer.customer.endpoint.repository.AddressRepository;
import com.customer.customer.endpoint.service.AddressServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@DataMongoTest
@ExtendWith(MockitoExtension.class)
public class AddressServiceTest {

    @InjectMocks
    private AddressServiceImpl addressService;

    @Mock
    private AddressRepository addressRepository;
//
//    @Test
//    public void whenListAll_thenReturnCorrectData () {
//
//        Address address1 = new Address("abc", "London street", 123L,
//                "", "next do Paris", true);
//        Address address2 = new Address("def", "New york street", 321L,
//                "", "next do some NY place", false);
//
//        when(addressRepository.findAll()).
//                thenReturn(asList(address1, address2));
//
//        assertThat(addressService.listAll()).isSameAs(addressRepository.findAll());
//    }
//
//    @Test
//    public void whenFindAddressByCustomerId_thenReturnAddress() {
//        Address address1 = new Address("abc", "London street", 123L,
//                "", "next do Paris", true);
//
//        Address address2 = new Address("abc", "Paris street", 1234L,
//                "ap 30", "next do London", false);
//
//        when(addressRepository.findById("abc")).
//                thenReturn(java.util.Optional.of(address2));
//
//        assertThat(addressService.getAddressById("abc")).isSameAs(addressRepository.findById("def"));
//    }

}
