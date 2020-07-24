package com.customer.customer.test;

import com.customer.customer.endpoint.model.DTO.CustomerDTO;
import com.customer.customer.endpoint.model.entity.Address;
import com.customer.customer.endpoint.model.entity.Customer;
import com.customer.customer.endpoint.error.ResourceNotFoundException;
import com.customer.customer.endpoint.model.mapper.CustomerMapper;
import com.customer.customer.endpoint.repository.CustomerRepository;
import com.customer.customer.endpoint.service.CustomerServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ConstraintViolationException;
import java.util.List;

import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;


@DataMongoTest
@ExtendWith(MockitoExtension.class)
public class CustomerServiceTest {

    @InjectMocks
    private CustomerServiceImpl customerService;

    @Mock
    private CustomerRepository customerRepository;

    @Spy
    CustomerMapper customerMapper = CustomerMapper.INSTANCE;

    private final Address addressOne = new Address("Rua Jasmim", 123L, "SP",
            "Campinas", "Mansoes Sto Antonio", "Brasil", "12345678",
            null, false, "", "");

    private final Address addressTwo = new Address("Rua Hermantino", 456L, "SP",
            "Campinas", "Taquaral", "Brasil", "87654321",
            null, false, "", "");

    private final Customer customer1 = new Customer("customer1Id", "joaozinho", "37991234567",
            "marcos.teste@email.com", "018931231283", asList(addressOne));

    private final Customer customer2 = new Customer("customer2Id", "mariazinha", "35987123456",
            "maria.teste@email.com", "01891234567", asList(addressTwo));

    @Test
    public void whenListAll_thenReturnCorrectData () {

        when(customerRepository.findAll()).
                thenReturn(asList(customer1, customer2));

        List<CustomerDTO> customerDTOList = customerService.listAll();

        assertEquals(2, customerDTOList.size());
    }

    @Test
    public void whenGetCustomerById_thenReturnCustomer() {

        when(customerRepository.findById(anyString())).
                thenReturn(java.util.Optional.of(customer1));

        CustomerDTO customerDTO = customerService.getCustomerById("customer1Id");

        assertThat(customerDTO).isNotNull();
    }

    @Test
    public void whenFindCustomerByName_thenReturnCustomer() {

        Customer customer3 = new Customer("customer3Id", "mariazinha", "35987123459",
                "mariazinha.teste@email.com", "018673238477", asList(addressOne));

        when(customerRepository.findByNameIgnoreCaseContaining(anyString())).
                thenReturn(asList(customer2, customer3));

        List<CustomerDTO> customerDTOList = customerService.findCustomerByName("mariazinha");

        assertEquals(2, customerDTOList.size());
    }

    @Test
    public void whenDeleteUsingWrongId_thenReturnResourceNotFoundException () {
        String id = "abc";

        Exception exception = assertThrows(
                ResourceNotFoundException.class,
                () -> customerService.delete(id));

        assertTrue(exception.getMessage().contains("Customer not found for ID: "+id));
    }

    @Test
    public void whenUpdateUsingWrongId_thenReturnResourceNotFoundException () {

        Exception exception = assertThrows(
                ResourceNotFoundException.class,
                () -> customerService.update(customerMapper.customerToCustomerDTO(customer1)));

        assertTrue(exception.getMessage().contains("Customer not found for ID: "+customer1.getId()));
    }

    @Test
    public void whenSaveCustomer_thenPersistData() {
        when(customerRepository.save(any(Customer.class))).
                thenReturn(customer1);

        CustomerDTO customerDTO = customerService.save(customerMapper.customerToCustomerDTO(customer1));

        assertEquals(customerDTO.getName(), customer1.getName());
    }




}
