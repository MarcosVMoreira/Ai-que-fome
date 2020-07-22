package com.customer.customer.test;

import com.customer.customer.endpoint.model.entity.Customer;
import com.customer.customer.endpoint.repository.CustomerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.validation.ConstraintViolationException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataMongoTest
@ExtendWith(SpringExtension.class)
public class CustomerRepositoryTest {

    @Autowired
    private CustomerRepository customerRepository;

    @Test
    public void whenFindByNameIgnoreCaseContaining_thenIgnoreCase () {
        Customer customer1 = new Customer("joaozinho", "37991234567",
                "marcos.teste@email.com", "018931231283");
        Customer customer2 = new Customer("Joaozinho", "37991234342",
                "marcosdois.teste@email.com", "01883342836");

        this.customerRepository.save(customer1);
        this.customerRepository.save(customer2);

        List<Customer> customerList = customerRepository.findByNameIgnoreCaseContaining("joaozinho");

        assertThat(customerList.size()).isEqualTo(2);
    }

    @Test
    public void whenEmptyName_thenConstraintViolations () {
        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("", "37991234567",
                        "marcos.teste@email.com", "018931231283")));

        assertTrue(exception.getMessage().contains("The field 'name' is mandatory"));
    }

    @Test
    public void whenEmptyCellphone_thenConstraintViolations () {
        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("joaozinho", "",
                        "marcos.teste@email.com", "018931231283")));

        assertTrue(exception.getMessage().contains("The field 'cellphone' is mandatory"));
    }

    @Test
    public void whenEmptyEmail_thenConstraintViolations () {
        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("joaozinho", "37991234567",
                        "", "018931231283")));

        assertTrue(exception.getMessage().contains("The field 'email' is mandatory"));
    }

    @Test
    public void whenEmptyTaxPayerIdentificationNumber_thenConstraintViolations () {
        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("joaozinho", "37991234567",
                        "marcos.teste@email.com", "")));

        assertTrue(exception.getMessage().contains("The field 'taxPayerIdentificationNumber' is mandatory"));
    }

    @Test
    public void whenInvalidEmail_thenConstraintViolations () {
        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("joaozinho", "37991234567",
                        "marcos.teste@.email.com", "018931231283")));

        assertTrue(exception.getMessage().contains("The email must be valid"));
    }

    @Test
    public void whenInvalidCellphoneSize_thenConstraintViolations () {
        assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("joaozinho", "1234567891011",
                        "marcos.teste@email.com", "018931231283")));
    }

}
