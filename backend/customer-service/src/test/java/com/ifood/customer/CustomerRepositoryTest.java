package com.ifood.customer;

import com.ifood.customer.endpoint.error.NotFoundException;
import com.ifood.customer.endpoint.model.entity.Address;
import com.ifood.customer.endpoint.model.entity.Customer;
import com.ifood.customer.endpoint.repository.CustomerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.validation.ConstraintViolationException;

import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class CustomerRepositoryTest {

    @Autowired
    private CustomerRepository customerRepository;

    private final Address addressOne = new Address("Rua Jasmim", 123L, "SP",
            "Campinas", "Mansoes Sto Antonio", "Brasil", "12345678",
            null, false, "", "");

    @Test
    public void readsFirstPageCorrectly() {

        Page<Customer> customers  = customerRepository.findAll(PageRequest.of(0, 10));
        assertThat(customers.isFirst()).isTrue();
    }

    @Test
    public void whenFindByEmailIgnoreCaseContaining_thenIgnoreCase () {

        Customer customer1 = new Customer("joaozinho", "37991234567",
                "marcos.teste@email.com", "018931231283", asList(addressOne));

        this.customerRepository.save(customer1);

        Customer foundCustomer =
                customerRepository.findByEmailIgnoreCaseContaining("Marcos.Teste@email.com")
                .orElseThrow(NotFoundException::new);

        assertThat(foundCustomer).isNotNull();
    }

    @Test
    public void whenEmptyName_thenConstraintViolations () {
        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("", "37991234567",
                        "marcos.teste@email.com", "018931231283", asList(addressOne))));

        assertTrue(exception.getMessage().contains("The field 'name' is mandatory"));
    }

    @Test
    public void whenEmptyCellphone_thenConstraintViolations () {
        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("joaozinho", "",
                        "marcos.teste@email.com", "018931231283", asList(addressOne))));

        assertTrue(exception.getMessage().contains("The field 'phone' is mandatory"));
    }

    @Test
    public void whenEmptyEmail_thenConstraintViolations () {
        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("joaozinho", "37991234567",
                        "", "018931231283", asList(addressOne))));

        assertTrue(exception.getMessage().contains("The field 'email' is mandatory"));
    }

    @Test
    public void whenEmptyTaxPayerIdentificationNumber_thenConstraintViolations () {
        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("joaozinho", "37991234567",
                        "marcos.teste@email.com", "", asList(addressOne))));

        assertTrue(exception.getMessage().contains("The field 'taxPayerIdentificationNumber' is mandatory"));
    }

    @Test
    public void whenInvalidEmail_thenConstraintViolations () {
        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("joaozinho", "37991234567",
                        "marcos.teste@.email.com", "018931231283", asList(addressOne))));

        assertTrue(exception.getMessage().contains("The email must be valid"));
    }

    @Test
    public void whenInvalidCellphoneSize_thenConstraintViolations () {
        assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("joaozinho", "1234567891011",
                        "marcos.teste@email.com", "018931231283", asList(addressOne))));
    }

    @Test
    public void whenInvalidEmbeddedStreetName_thenConstraintViolations () {

        Address address = new Address("", 123L, "SP",
                "Campinas", "Mansoes Sto Antonio", "Brasil", "12345678",
                null, false, "", "");

        Customer customer = new Customer("customer2Id", "Marcos", "35987123456",
                "maria.teste@email.com", "01891234567", asList(address));

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(customer));

        assertTrue(exception.getMessage().contains("The field 'streetName' is mandatory"));
    }

    @Test
    public void whenInvalidEmbeddedCellphone_thenConstraintViolations () {

        Address address = new Address("Rua Assis", null, "SP",
                "Campinas", "Mansoes Sto Antonio", "Brasil", "12345678",
                null, false, "", "");

        Customer customer = new Customer("customer2Id", "", "35987123456",
                "maria.teste@email.com", "01891234567", asList(address));

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(customer));

        assertTrue(exception.getMessage().contains("The field 'streetNumber' is mandatory"));
    }

    @Test
    public void whenInvalidEmbeddedDistrict_thenConstraintViolations () {

        Address address = new Address("Rua Assis", 123L, "",
                "Campinas", "Mansoes Sto Antonio", "Brasil", "12345678",
                null, false, "", "");

        Customer customer = new Customer("customer2Id", "", "35987123456",
                "maria.teste@email.com", "01891234567", asList(address));

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(customer));

        assertTrue(exception.getMessage().contains("The field 'district' is mandatory"));
    }

    @Test
    public void whenInvalidEmbeddedCity_thenConstraintViolations () {

        Address address = new Address("Rua Assis", 123L, "SP",
                "", "Mansoes Sto Antonio", "Brasil", "12345678",
                null, false, "", "");

        Customer customer = new Customer("customer2Id", "", "35987123456",
                "maria.teste@email.com", "01891234567", asList(address));

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(customer));

        assertTrue(exception.getMessage().contains("The field 'city' is mandatory"));
    }

    @Test
    public void whenInvalidEmbeddedNeighborhood_thenConstraintViolations () {

        Address address = new Address("Rua Assis", 123L, "SP",
                "Campinas", "", "Brasil", "12345678",
                null, false, "", "");

        Customer customer = new Customer("customer2Id", "", "35987123456",
                "maria.teste@email.com", "01891234567", asList(address));

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(customer));

        assertTrue(exception.getMessage().contains("The field 'neighborhood' is mandatory"));
    }

    @Test
    public void whenInvalidEmbeddedCountry_thenConstraintViolations () {

        Address address = new Address("Rua Assis", 123L, "SP",
                "Campinas", "Mansoes St Antonio", "", "12345678",
                null, false, "", "");

        Customer customer = new Customer("customer2Id", "", "35987123456",
                "maria.teste@email.com", "01891234567", asList(address));

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(customer));

        assertTrue(exception.getMessage().contains("The field 'country' is mandatory"));
    }

    @Test
    public void whenInvalidEmbeddedPostalcode_thenConstraintViolations () {

        Address address = new Address("Rua Assis", 123L, "SP",
                "Campinas", "Mansoes St Antonio", "Brasil", "",
                null, false, "", "");

        Customer customer = new Customer("customer2Id", "", "35987123456",
                "maria.teste@email.com", "01891234567", asList(address));

        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(customer));

        assertTrue(exception.getMessage().contains("The field 'postalCode' is mandatory"));
    }

}
