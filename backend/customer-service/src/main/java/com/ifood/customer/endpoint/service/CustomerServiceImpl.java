package com.ifood.customer.endpoint.service;

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
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
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

    public CustomerServiceImpl (CustomerMapper customerMapper) {
        this.customerMapper = customerMapper;
    }

    public CustomerServiceImpl (CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<CustomerDTO> listAll (Pageable pageable) {
        logger.debug("Recuperando da base de dados todos os clientes...");
        return customerRepository.findAll(pageable)
                .stream()
                .map(customerMapper::customerToCustomerDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDTO getCustomerById (String id) {
        logger.debug("Recuperando da base de dados todos registros utilizando o id {}", id);
        return customerRepository.findById(id)
                .map(customerMapper::customerToCustomerDTO)
                .orElseThrow(NotFoundException::new);
    }

    @Override
    public CustomerDTO findCustomerByEmail (String email) {
        return customerMapper.customerToCustomerDTO
                (customerRepository.findByEmailIgnoreCaseContaining(email)
                .orElseThrow(NotFoundException::new));
    }

    @Override
    public CustomerDTO save (@Valid CustomerDTO customerDTO) {

        Optional<Customer> entity = customerRepository.findByEmailIgnoreCaseContaining(customerDTO.getEmail());

        if (entity.isPresent()) {
            logger.info("Email {} já existe na base de dados.", customerDTO.getEmail());
            throw new UnprocessableEntityException("422.000");
        }

        Customer customer = customerMapper.customerDTOToCustomer(customerDTO);
        return customerMapper.customerToCustomerDTO(customerRepository.save(customer));
    }

    @Override
    public void delete (String id) {
        Optional<Customer> entity = customerRepository.findById(id);

        if (entity.isPresent()) {
            customerRepository.deleteById(id);
        }
    }

    @Override
    public CustomerDTO update (CustomerDTO customerDTO, String id) {

        Customer customer = customerRepository
                .findById(id)
                .orElseThrow(NotFoundException::new);

        Optional<Customer> verifyingEmail =
                customerRepository.findByEmailIgnoreCaseContaining(customerDTO.getEmail());

        if (verifyingEmail.isPresent()) {
            throw new UnprocessableEntityException("422.00");
        }

        customer.setEmail(customerDTO.getEmail());
        customer.setAddresses(customerDTO.getAddresses());
        customer.setName(customerDTO.getName());
        customer.setPhone(customerDTO.getPhone());
        customer.setTaxPayerIdentificationNumber(customerDTO.getTaxPayerIdentificationNumber());

        return customerMapper.customerToCustomerDTO(customerRepository.save(customer));
    }

}
