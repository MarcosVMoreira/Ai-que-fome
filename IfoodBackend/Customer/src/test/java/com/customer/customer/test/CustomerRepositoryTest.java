package com.customer.customer;

import com.customer.customer.endpoint.entity.Customer;
import com.customer.customer.endpoint.repository.CustomerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

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
        Customer customer1 = new Customer("joaozinho", "37991234567", "marcos.teste@email.com");
        Customer customer2 = new Customer("Joaozinho", "37991234342", "marcosdois.teste@email.com");

        this.customerRepository.save(customer1);
        this.customerRepository.save(customer2);

        List<Customer> customerList = customerRepository.findByNameIgnoreCaseContaining("joaozinho");

        assertThat(customerList.size()).isEqualTo(2);
    }

    @Test
    public void whenEmptyName_thenConstraintViolations () {
        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("", "37991234567", "email@gmail.com")));

        assertTrue(exception.getMessage().contains("The field 'name' is mandatory"));
    }

    @Test
    public void whenEmptyCellphone_thenConstraintViolations () {
        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("marcos", "", "email@gmail.com")));

        assertTrue(exception.getMessage().contains("The field 'cellphone' is mandatory"));
    }

    @Test
    public void whenEmptyEmail_thenConstraintViolations () {
        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("marcos", "37991234567", "")));

        assertTrue(exception.getMessage().contains("The field 'email' is mandatory"));
    }

    @Test
    public void whenInvalidEmail_thenConstraintViolations () {
        Exception exception = assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("marcos", "37991234567", "wrong.email.format")));

        assertTrue(exception.getMessage().contains("The email must be valid"));
    }

    @Test
    public void whenInvalidCellphoneSize_thenConstraintViolations () {
        assertThrows(
                ConstraintViolationException.class,
                () -> customerRepository.save(new Customer("marcos", "3799123456711", "email@gmail.com")));
    }

}
