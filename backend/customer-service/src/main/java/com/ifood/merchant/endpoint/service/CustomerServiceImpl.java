package com.ifood.merchant.endpoint.service;

import com.ifood.merchant.endpoint.error.BadRequestException;
import com.ifood.merchant.endpoint.error.NotFoundException;
import com.ifood.merchant.endpoint.error.UnprocessableEntityException;
import com.ifood.merchant.endpoint.model.dto.AddressDTO;
import com.ifood.merchant.endpoint.model.dto.CustomerDTO;
import com.ifood.merchant.endpoint.model.entity.Address;
import com.ifood.merchant.endpoint.model.entity.Customer;
import com.ifood.merchant.endpoint.model.entity.MerchantRate;
import com.ifood.merchant.endpoint.model.mapper.AddressMapper;
import com.ifood.merchant.endpoint.model.mapper.CustomerMapper;
import com.ifood.merchant.endpoint.repository.CustomerRepository;
import com.ifood.merchant.message.producer.CustomerMessageProducer;
import com.ifood.merchant.message.producer.MerchantRateMessageProducer;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collections;
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

    private AddressMapper addressMapper;

    private CustomerMessageProducer messageProducer;

    private MerchantRateMessageProducer merchantRateMessageProducer;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository,
                               CustomerMapper customerMapper, AddressMapper addressMapper,
                               CustomerMessageProducer messageProducer, MerchantRateMessageProducer merchantRateMessageProducer) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
        this.addressMapper = addressMapper;
        this.messageProducer = messageProducer;
        this.merchantRateMessageProducer = merchantRateMessageProducer;
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

        //verificacao antiga se o customerDTO veio com email.
        //como agora faco essa verificacao no customerDTO usando validators
        //isso aqui nao tem mais necessidade
        Customer customer = customerMapper.customerDTOToCustomer(customerDTO);

        if (!Optional.ofNullable(customer.getEmail()).isPresent() ||
                customer.getEmail().isEmpty()) {
            throw new BadRequestException("400.000");
        }

        Optional<Customer> entity = customerRepository.findByEmailIgnoreCaseContaining(customer.getEmail());

        if (entity.isPresent()) {
            logger.info("Email {} já existe na base de dados.", customer.getEmail());
            throw new UnprocessableEntityException("422.001");
        }

        CustomerDTO createdCustomer = customerMapper.customerToCustomerDTO(customerRepository.save(customer));

        messageProducer.sendCustomerDataToRabbit(createdCustomer);

        return createdCustomer;
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

        if (!Optional.ofNullable(customerFromRequest.getEmail()).isPresent() ||
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

    @Override
    public List<String> saveAddress(String customerId, @Valid AddressDTO addressDTO) {

        List<String> list = new ArrayList<>();

        Optional<Customer> customer = customerRepository.findById(customerId);

        if (customer.isPresent()) {

            addressDTO.setId(new Address().getId());

            Optional.ofNullable(customer.get().getAddresses())
                    .ifPresent(a -> a.add(addressMapper.addressDTOToAddress(addressDTO)));

            if (!Optional.ofNullable(customer.get().getAddresses()).isPresent()) {
                customer.get()
                        .setAddresses(Collections.singletonList(addressMapper.addressDTOToAddress(addressDTO)));
            }

            customerRepository.save(customer.get());

            list.add(customer.get().getId());
            list.add(addressDTO.getId());

            return list;
        }

        throw new NotFoundException();
    }

    @Override
    public List<AddressDTO> listAllAddress(String idCustomer) {

        if (!customerRepository.findById(idCustomer).isPresent()) {
            throw new NotFoundException();
        }

        return customerRepository.findById(idCustomer).get().getAddresses()
                .stream()
                .map(address -> addressMapper.addressToAdressDTO(address))
                .collect(Collectors.toList());
    }

    @Override
    public AddressDTO getAddressById(String idCustomer, String idAddress) {
        Optional<Customer> customer = customerRepository.findById(idCustomer);

        if (!customer.isPresent()) {
            throw new NotFoundException();
        }

        Address address = customer.get().getAddresses().stream()
                .filter(a -> idAddress.equals(a.getId()))
                .findAny()
                .orElseThrow(NotFoundException::new);

        return addressMapper.addressToAdressDTO(address);
    }

    @Override
    public CustomerDTO updateAddress(String idCustomer, String idAddress, @Valid AddressDTO address) {
        Optional<Customer> customer = customerRepository.findById(idCustomer);

        if (!customer.isPresent()) {
            throw new NotFoundException();
        }

        customer.get().getAddresses().stream()
                .filter(a -> idAddress.equals(a.getId()))
                .findAny()
                .orElseThrow(NotFoundException::new);

        address.setId(idAddress);

        List<Address> addresses = customer.get().getAddresses();
        addresses.removeIf(a -> a.getId().equals(idAddress));
        addresses.add(addressMapper.addressDTOToAddress(address));
        customer.get().setAddresses(addresses);
        return customerMapper.customerToCustomerDTO(customerRepository.save(customer.get()));
    }

    @Override
    public void deleteAddress(String idCustomer, String idAddress) {
        Optional<Customer> customer = customerRepository.findById(idCustomer);

        if (!customer.isPresent()) {
            throw new NotFoundException();
        }

        List<Address> addresses = customer.get().getAddresses();

        if (!addresses.isEmpty()) {
            addresses.removeIf(a -> a.getId().equals(idAddress));
            customer.get().setAddresses(addresses);
            customerRepository.save(customer.get());
        }
    }

    @Override
    public CustomerDTO saveRate(String idCustomer, @Valid @RequestBody MerchantRate merchantRate) {
        Optional<Customer> customer = customerRepository.findById(idCustomer);

        if (!customer.isPresent()) {
            throw new NotFoundException();
        }

        merchantRate.setId(new MerchantRate().getId());

        if (Optional.ofNullable(customer.get().getMerchantRates())
                .isPresent()) {
            if (customer.get().getMerchantRates()
                    .stream()
                    .anyMatch(merchantRateItem -> merchantRate.getMerchantId()
                            .equals(merchantRateItem.getMerchantId()))) {
                throw new UnprocessableEntityException("422.005");
            }

            if (merchantRate.getRate() < 0 && merchantRate.getRate() > 5) {
                throw new UnprocessableEntityException("422.006");
            }

            customer.get().getMerchantRates().add(merchantRate);
        }

        if (!Optional.ofNullable(customer.get().getMerchantRates()).isPresent()) {
            customer.get()
                    .setMerchantRates(Collections.singletonList(merchantRate));
        }

        merchantRateMessageProducer.sendRateDataToRabbit(merchantRate);

        return customerMapper.customerToCustomerDTO(customerRepository.save(customer.get()));
    }
}