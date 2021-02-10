package com.ifood.customer;

import com.ifood.customer.endpoint.model.dto.CustomerDTO;
import com.ifood.customer.endpoint.model.entity.Address;
import com.ifood.customer.endpoint.model.entity.Customer;
import com.ifood.customer.endpoint.model.mapper.CustomerMapper;
import com.ifood.customer.endpoint.repository.CustomerRepository;
import com.ifood.customer.endpoint.service.CustomerServiceImpl;
import com.ifood.customer.message.producer.CustomerMessageProducer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.isA;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class CustomerServiceTest {

    @InjectMocks
    private CustomerServiceImpl customerService;

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private CustomerMessageProducer customerMessageProducer;

    @Spy
    CustomerMapper customerMapper = CustomerMapper.INSTANCE;

    private final Address addressOne = new Address("Rua Jasmim", 123L, "SP",
            "Campinas", "Mansoes Sto Antonio", "Brasil", "12345678",
            null, false, "", "");

    private final Address addressTwo = new Address("Rua Hermantino", 456L, "SP",
            "Campinas", "Taquaral", "Brasil", "87654321",
            null, false, "", "");

    private final Customer customer1 = new Customer("joaozinho", "37991234567",
            "marcos.teste@email.com", "018931231283", asList(addressOne));

    private final Customer customer2 = new Customer("mariazinha", "35987123456",
            "maria.teste@email.com", "01891234567", asList(addressTwo));

    @Test
    public void whenListAll_thenReturnCorrectData() {

        Sort sort = Sort.by(Sort.Order.desc("name"));
        Pageable pageable = PageRequest.of(1, 5, sort);

        Page<Customer> pagedStudents = new PageImpl(asList(customer1, customer2));

        when(customerRepository.findAll(isA(Pageable.class))).thenReturn(pagedStudents);

        List<CustomerDTO> customerDTOList = customerService.listAll(pageable);

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
    public void whenFindCustomerByEmail_thenReturnCustomer() {

        Optional<Customer> customer = Optional.of(new Customer("mariazinha", "35987123459",
                "mariazinha.teste@email.com", "018673238477", asList(addressOne)));

        when(customerRepository.findByEmailIgnoreCaseContaining("mariazinha.teste@email.com")).
                thenReturn(customer);

        CustomerDTO customerResponseDTO =
                customerService.findCustomerByEmail("mariazinha.teste@email.com");

        assertThat(customerResponseDTO).isNotNull();
    }

    @Test
    void whenSaveCustomer_thenPersistData() {
        when(customerRepository.save(any(Customer.class))).
                thenReturn(customer1);

        CustomerDTO customerDTO = customerService.save(customerMapper.customerToCustomerDTO(customer1));

        customerMessageProducer.sendCustomerDataToRabbit(customerDTO);

        assertEquals(customerDTO.getName(), customer1.getName());
    }
}