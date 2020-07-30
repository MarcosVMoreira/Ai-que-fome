package com.customer.endpoint.service;

import com.customer.endpoint.error.ResourceNotFoundException;
import com.customer.endpoint.model.DTO.CustomerDTO;
import com.customer.endpoint.model.entity.Customer;
import com.customer.endpoint.model.mapper.CustomerMapper;
import com.customer.endpoint.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerMapper customerMapper;

    @Override
    public List<CustomerDTO> listAll (Pageable pageable) {
        return customerRepository.findAll(pageable)
                .stream()
                .map(customerMapper::customerToCustomerDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDTO getCustomerById (String id) {
        verifyByIdIfCustomerExists(id);
        return customerMapper.customerToCustomerDTO(customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found for given ID: "+id)));
    }

    @Override
    public List<CustomerDTO> findCustomerByName (String name) {
        verifyByNameIfCustomerExists(name);
        return customerRepository.findByNameIgnoreCaseContaining(name)
                .stream()
                .map(customerMapper::customerToCustomerDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDTO save (@Valid CustomerDTO customerDTO) {
        Customer customer = customerMapper.customerDTOToCustomer(customerDTO);
        return customerMapper.customerToCustomerDTO(customerRepository.save(customer));
    }

    @Override
    public void delete (String id) {
        verifyByIdIfCustomerExists(id);
        customerRepository.deleteById(id);
    }

    @Override
    public CustomerDTO update (CustomerDTO customerDTO) {

        Customer customer = customerMapper.customerDTOToCustomer(customerDTO);

        verifyByIdIfCustomerExists(customer.getId());
        return customerMapper.customerToCustomerDTO(customerRepository.save(customer));
    }

    @Override
    public void verifyByIdIfCustomerExists (String id) {
        if (!customerRepository.findById(id).isPresent()) {
            throw new ResourceNotFoundException("Customer not found for ID: " + id);
        }
    }

    @Override
    public void verifyByNameIfCustomerExists (String nome) {
        if (customerRepository.findByNameIgnoreCaseContaining(nome).isEmpty()) {
            throw new ResourceNotFoundException("Customer not found for name: " + nome);
        }
    }

}
