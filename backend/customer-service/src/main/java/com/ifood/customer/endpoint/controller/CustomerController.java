package com.ifood.customer.endpoint.controller;

import com.ifood.customer.endpoint.error.ResourceNotFoundException;
import com.ifood.customer.endpoint.model.dto.CustomerDTO;
import com.ifood.customer.endpoint.service.CustomerServiceImpl;
import io.swagger.annotations.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("customers")
@Api(value = "Endpoints to manage customer")
public class CustomerController {

    private CustomerServiceImpl customerServiceImpl;

    public CustomerController (CustomerServiceImpl customerServiceImpl) {
        this.customerServiceImpl = customerServiceImpl;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "List all registered customers", response = CustomerDTO[].class, produces = "application/json")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "integer", paramType = "query",
                    value = "Results page you want to retrieve (0..N)"),
            @ApiImplicitParam(name = "size", dataType = "integer", paramType = "query",
                    value = "Number of records per page."),
            @ApiImplicitParam(name = "sort", allowMultiple = true, dataType = "string", paramType = "query",
                    value = "Sorting criteria in the format: property(asc|desc). " +
                            "Default sort order is ascending. " +
                            "Multiple sort criteria are supported.")
    })
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Customers successful found."),
            @ApiResponse(code = 401, message = "Unable to complete authentication process. There may be " +
                    "an error with given token."),
            @ApiResponse(code = 403, message = "You have no authorization for this type of" +
                    " requisition."),
            @ApiResponse(code = 404, message = "Customer not found."),
    })
    public Page<CustomerDTO> listAll (Pageable pageable) {
        return new PageImpl<>(customerServiceImpl.listAll(pageable));
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Return customer by given id", response = CustomerDTO.class, produces = "application/json")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", dataType = "string", paramType = "query",
                    value = "Customer ID.")
    })
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Customer successful found."),
            @ApiResponse(code = 401, message = "Unable to complete authentication process. There may be " +
                    "an error with given token."),
            @ApiResponse(code = 403, message = "You have no authorization for this type of" +
                    " requisition."),
            @ApiResponse(code = 404, message = "Customer not found."),
    })
    public CustomerDTO getCustomerById (@ApiParam(
            value = "ID from the customer to be retrieved.") @PathVariable String id) {
        verifyIfCustomerExistsById(id);
        return customerServiceImpl.getCustomerById(id);
    }

    @GetMapping("byName/{name}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Return customer by given name", response = CustomerDTO.class, produces = "application/json")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name", dataType = "string", paramType = "query",
                    value = "Customer name.")
    })
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Customer successful found."),
            @ApiResponse(code = 401, message = "Unable to complete authentication process. There may be " +
                    "an error with given token."),
            @ApiResponse(code = 403, message = "You have no authorization for this type of" +
                    " requisition."),
            @ApiResponse(code = 404, message = "Customer not found for given name."),
    })
    public List<CustomerDTO> getCustomerByName (@ApiParam(
            value = "Name from the customer to be retrieved.") @PathVariable String name) {
        verifyIfCustomerExistsByName(name);
        return customerServiceImpl.findCustomerByName(name);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    @ApiOperation(value = "Create new user.", response = CustomerDTO.class,
            produces = "application/json", consumes = "application/json")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Customer successful created."),
            @ApiResponse(code = 401, message = "Unable to complete authentication process. There may be " +
                    "an error with given token."),
            @ApiResponse(code = 403, message = "You have no authorization for this type of" +
                    " requisition."),
    })
    public CustomerDTO save (@ApiParam(
            value = "New user data structured in JSON format.") @Valid @RequestBody CustomerDTO customerDTO) {
        return customerServiceImpl.save(customerDTO);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    @Transactional
    @ApiOperation(value = "Update existing user.", response = CustomerDTO.class,
            produces = "application/json", consumes = "application/json")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Customer successful updated."),
            @ApiResponse(code = 401, message = "Unable to complete authentication process. There may be " +
                    "an error with given token."),
            @ApiResponse(code = 403, message = "You have no authorization for this type of" +
                    " requisition."),
            @ApiResponse(code = 404, message = "Customer not found for given ID."),
    })
    public CustomerDTO update (@ApiParam(
            value = "Already existing user with edited values structured in JSON format.")
                               @Valid @RequestBody CustomerDTO customerDTO) {
        verifyIfCustomerExistsById(customerDTO.getId());
        return customerServiceImpl.update(customerDTO);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    @ApiOperation(value = "Delete existing user.")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "Customer successful deleted."),
            @ApiResponse(code = 401, message = "Unable to complete authentication process. There may be " +
                    "an error with given token."),
            @ApiResponse(code = 403, message = "You have no authorization for this type of" +
                    " requisition."),
    })
    public void delete (@ApiParam(
            value = "ID from customer that you want to delete.",
            example = "5f1af2a61c43ab69623fc49e") @PathVariable String id) {
        verifyIfCustomerExistsById(id);
        customerServiceImpl.delete(id);
    }

    private void verifyIfCustomerExistsById (String id) {
        if (customerServiceImpl.getCustomerById(id) == null) {
            throw new ResourceNotFoundException("Customer not found for ID: " + id);
        }
    }

    private void verifyIfCustomerExistsByName (String name) {
        if (customerServiceImpl.findCustomerByName(name) == null) {
            throw new ResourceNotFoundException("Customer not found for name: " + name);
        }
    }

}
