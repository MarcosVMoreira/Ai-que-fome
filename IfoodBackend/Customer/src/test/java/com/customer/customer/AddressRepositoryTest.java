package com.customer.customer;

import com.customer.customer.endpoint.entity.Address;
import com.customer.customer.endpoint.repository.AddressRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.validation.ConstraintViolationException;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class AddressRepositoryTest {

    @Autowired
    private AddressRepository addressRepository;

    @Test
    public void whenCustomerIDEmpty_thenConstraintViolations () {

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> addressRepository.save(
                        new Address(null, "London street", 123L,
                                "ap 40", "next do Paris", true)));

        assertTrue(exception.getMessage().contains("The field 'idCustomer' is mandatory"));

    }

    @Test
    public void whenInformationEmpty_thenConstraintViolations () {

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> addressRepository.save(
                        new Address(0L, "", 123L,
                                "ap 40", "next do Paris", true)));

        assertTrue(exception.getMessage().contains("The field 'information' is mandatory"));
    }

    @Test
    public void whenNumberEmpty_thenConstraintViolations () {

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> addressRepository.save(
                        new Address(0L, "London street", null,
                                "ap 40", "next do Paris", true)));

        assertTrue(exception.getMessage().contains("The field 'number' is mandatory"));
    }

    @Test
    public void whenComplementEmpty_thenConstraintViolations () {

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> addressRepository.save(
                        new Address(0L, "London street", 123L,
                                "", "next do Paris", true)));

        assertTrue(exception.getMessage().contains("The field 'complement' is mandatory"));
    }

    @Test
    public void whenReferencePointEmpty_thenConstraintViolations () {

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> addressRepository.save(
                        new Address(0L, "London street", 123L,
                                "ap 40", "", true)));

        assertTrue(exception.getMessage().contains("The field 'refPoint' is mandatory"));
    }

    @Test
    public void whenInvalidComplementFieldSize_thenConstraintViolations () {

        assertThrows(
                ConstraintViolationException.class,
                () -> addressRepository.save(
                        new Address(0L, "London street", 123L,
                                "Lorem ipsum dolor sit amet, consectetur " +
                                        "adipiscing elit. Nulla blandit lorem velit, " +
                                        "eu euismod justo. ", "next do Paris", true)));

    }

}
