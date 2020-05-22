package com.customer.customer;

import com.customer.customer.endpoint.DTO.Customer;
import com.customer.customer.endpoint.repository.CustomerRepository;
import com.customer.customer.endpoint.service.CustomerServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;


@Transactional
@ExtendWith(MockitoExtension.class)
@DataJpaTest
public class CustomerServiceTest {

    @InjectMocks
    private CustomerServiceImpl customerService;

    @Mock
    private CustomerRepository customerRepository;

    @Test
    public void whenListAll_thenReturnCorrectData () {

        Customer customer1 = new Customer("Marcos", "37991234567", "marcos.teste@email.com");
        Customer customer2 = new Customer("Jose", "37991234567", "jose.teste@email.com");

        when(customerRepository.findAll()).
                thenReturn(asList(customer1, customer2));

        assertThat(customerService.listAll()).isSameAs(customerRepository.findAll());
    }

    @Test
    public void whenGetCustomerById_thenReturnCustomer() {
        Customer customer = new Customer(1L,"Marcos", "37991234567", "marcos.teste@email.com");

        when(customerRepository.findById(1L)).
                thenReturn(java.util.Optional.of(customer));

        assertThat(customerService.getCustomerById(1L)).isSameAs(customerRepository.findById(1L));
    }

    @Test
    public void whenFindCustomerByName_thenReturnCustomer() {
        Customer customer1 = new Customer(1L,"Marcos", "37991234567", "marcos.teste@email.com");
        Customer customer2 = new Customer(1L,"marcos", "37991232222", "teste.teste@email.com");

        when(customerRepository.findByNameIgnoreCaseContaining("marcos")).
                thenReturn(asList(customer1, customer2));

        assertThat(customerService.findCustomerByName("marcos")).isSameAs(customerRepository.findByNameIgnoreCaseContaining("marcos"));
    }

}
