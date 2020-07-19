package com.customer.customer.test;

import com.customer.customer.endpoint.model.entity.Address;
import com.customer.customer.endpoint.repository.AddressRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.validation.ConstraintViolationException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class AddressRepositoryTest {

    @Autowired
    private AddressRepository addressRepository;

    @Test
    public void whenFindByidCustomer_thenReturnAddressList () {
        Address addressOne = new Address("addressId", "abc", "Rua Jasmim", 123L, "SP",
                "Campinas", "Mansoes Sto Antonio", "Brasil", "12345678",
                null, false, "", "");

        addressRepository.save(addressOne);

        Address addressTwo = new Address("addressTwo", "def", "Rua Hermantino", 456L, "SP",
                "Campinas", "Taquaral", "Brasil", "87654321",
                null, false, "", "");

        addressRepository.save(addressTwo);

        List<Address> addressList = addressRepository.findByidCustomer("def");

        assertEquals(addressList.size(), 1);
    }

    @Test
    public void whenCustomerIDEmpty_thenConstraintViolations () {

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> addressRepository.save(
                        new Address("", "Rua Jasmim", 123L, "SP",
                                "Campinas", "Mansoes Sto Antonio", "Brasil", "12345666",
                                null, false, "", "")));

        assertTrue(exception.getMessage().contains("The field 'idCustomer' is mandatory"));

    }

    @Test
    public void whenStreetNameEmpty_thenConstraintViolations () {

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> addressRepository.save(
                        new Address("abcd", "", 123L, "SP",
                                "Campinas", "Mansoes Sto Antonio", "Brasil", "12345666",
                                null, false, "", "")));

        assertTrue(exception.getMessage().contains("The field 'streetName' is mandatory"));
    }

    @Test
    public void whenStreetNumberEmpty_thenConstraintViolations () {

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> addressRepository.save(
                        new Address("abcd", "Rua Jasmim", null, "SP",
                                "Campinas", "Mansoes Sto Antonio", "Brasil", "12345666",
                                null, false, "", "")));

        assertTrue(exception.getMessage().contains("The field 'streetNumber' is mandatory"));
    }

    @Test
    public void whenDistrictEmpty_thenConstraintViolations () {

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> addressRepository.save(
                        new Address("abcd", "Rua Jasmim", 123L, "",
                                "Campinas", "Mansoes Sto Antonio", "Brasil", "12345666",
                                null, false, "", "")));

        assertTrue(exception.getMessage().contains("The field 'district' is mandatory"));
    }

    @Test
    public void whenNeighborhoodEmpty_thenConstraintViolations () {

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> addressRepository.save(
                        new Address("abcd", "Rua Jasmim", 123L, "SP",
                                "Campinas", "", "Brasil", "12345666",
                                null, false, "", "")));

        assertTrue(exception.getMessage().contains("The field 'neighborhood' is mandatory"));
    }

    @Test
    public void whenCountryEmpty_thenConstraintViolations () {

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> addressRepository.save(
                        new Address("abcd", "Rua Jasmim", 123L, "SP",
                                "Campinas", "Mansoes Sto Antonio", "", "12345666",
                                null, false, "", "")));

        assertTrue(exception.getMessage().contains("The field 'country' is mandatory"));
    }

    @Test
    public void whenPostalCodeEmpty_thenConstraintViolations () {

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> addressRepository.save(
                        new Address("abcd", "Rua Jasmim", 123L, "SP",
                                "", "Mansoes Sto Antonio", "Brasil", "",
                                null, false, "", "")));

        assertTrue(exception.getMessage().contains("The field 'postalCode' is mandatory"));
    }

    @Test
    public void whenPostalCodeSizeGreaterThan8_thenConstraintViolations () {

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> addressRepository.save(
                        new Address("abcd", "Rua Jasmim", 123L, "SP",
                                "", "Mansoes Sto Antonio", "Brasil", "123456789",
                                null, false, "", "")));

        assertTrue(exception.getMessage().contains("The field 'postalCode' must have size 8"));
    }

}
