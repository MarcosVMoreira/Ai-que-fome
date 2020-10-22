package com.ifood.customer.endpoint.service;

import com.ifood.customer.endpoint.error.BadRequestException;
import com.ifood.customer.endpoint.error.NotFoundException;
import com.ifood.customer.endpoint.error.UnprocessableEntityException;
import com.ifood.customer.endpoint.model.dto.CustomerDTO;
import com.ifood.customer.endpoint.model.entity.Customer;
import com.ifood.customer.endpoint.model.mapper.CustomerMapper;
import com.ifood.customer.endpoint.repository.CustomerRepository;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Slf4j
@NoArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);

    private CustomerRepository customerRepository;

    private CustomerMapper customerMapper;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository, CustomerMapper customerMapper) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
    }

    @Override
    public List<CustomerDTO> listAll(Pageable pageable) {
        logger.info("Recuperando da base de dados todos os clientes...");
        return customerRepository.findAll(pageable)
                .stream()
                .map(customerMapper::customerToCustomerDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDTO getCustomerById(String id) {
        logger.info("Recuperando da base de dados todos registros utilizando o id {}", id);
        return customerRepository.findById(id)
                .map(customerMapper::customerToCustomerDTO)
                .orElseThrow(NotFoundException::new);
    }

    @Override
    public CustomerDTO findCustomerByEmail(String email) {
        return customerMapper.customerToCustomerDTO
                (customerRepository.findByEmailIgnoreCaseContaining(email)
                        .orElseThrow(NotFoundException::new));
    }

    @Override
    public CustomerDTO save(@Valid CustomerDTO customerDTO) {
        logger.info("Criando nova entrada na base de dados...");

        Customer customer = customerMapper.customerDTOToCustomer(customerDTO);

        if(!Optional.ofNullable(customer.getEmail()).isPresent() ||
        customer.getEmail().isEmpty()) {
            throw new BadRequestException("400.000");
        }

        Optional<Customer> entity = customerRepository.findByEmailIgnoreCaseContaining(customer.getEmail());

        if (entity.isPresent()) {
            logger.info("Email {} já existe na base de dados.", customer.getEmail());
            throw new UnprocessableEntityException("422.001");
        }

        return customerMapper.customerToCustomerDTO(customerRepository.save(customer));
    }

    @Override
    public void delete(String id) {
        Optional<Customer> entity = customerRepository.findById(id);

        if (entity.isPresent()) {
            customerRepository.deleteById(id);
        }
    }

    @Override
    public CustomerDTO update(CustomerDTO customerDTO, String id) {

        //Lógica:
        //Se existe o id passado, então é possível fazer o update do elemento.
        //Considerando esse elemento existente, se for passado um email
        //que seja igual ao email de outra conta (comparo através dos ids), eu lanço Unprocessable

        Customer customerFromRequest = customerMapper.customerDTOToCustomer(customerDTO);

        if(!Optional.ofNullable(customerFromRequest.getEmail()).isPresent() ||
                customerFromRequest.getEmail().isEmpty()) {
            throw new BadRequestException("400.000");
        }

        Customer customerFromDatabase = customerRepository
                .findById(id)
                .orElseThrow(NotFoundException::new);

        Optional<Customer> verifyingEmail =
                customerRepository.findByEmailIgnoreCaseContaining(customerFromRequest.getEmail());

        if (verifyingEmail.isPresent() && !verifyingEmail.get().getId().equals(id)) {
            throw new UnprocessableEntityException("422.001");
        }

        customerFromDatabase.setEmail(customerFromRequest.getEmail());
        customerFromDatabase.setAddresses(customerFromRequest.getAddresses());
        customerFromDatabase.setName(customerFromRequest.getName());
        customerFromDatabase.setPhone(customerFromRequest.getPhone());
        customerFromDatabase.setTaxPayerIdentificationNumber(customerFromRequest.getTaxPayerIdentificationNumber());

        return customerMapper.customerToCustomerDTO(customerRepository.save(customerFromDatabase));
    }
}