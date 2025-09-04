package mg.transversal.commerce_brand.customer.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import mg.transversal.commerce_brand.customer.model.CustomerDTO;
import mg.transversal.commerce_brand.customer.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/customers", produces = MediaType.APPLICATION_JSON_VALUE)
public class CustomerResource {

    private final CustomerService customerService;

    public CustomerResource(final CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        return ResponseEntity.ok(customerService.findAll());
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<CustomerDTO> getCustomer(
            @PathVariable(name = "customerId") final Integer customerId) {
        return ResponseEntity.ok(customerService.get(customerId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Integer> createCustomer(
            @RequestBody @Valid final CustomerDTO customerDTO) {
        final Integer createdCustomerId = customerService.create(customerDTO);
        return new ResponseEntity<>(createdCustomerId, HttpStatus.CREATED);
    }

    @PutMapping("/{customerId}")
    public ResponseEntity<Integer> updateCustomer(
            @PathVariable(name = "customerId") final Integer customerId,
            @RequestBody @Valid final CustomerDTO customerDTO) {
        customerService.update(customerId, customerDTO);
        return ResponseEntity.ok(customerId);
    }

    @DeleteMapping("/{customerId}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCustomer(
            @PathVariable(name = "customerId") final Integer customerId) {
        customerService.delete(customerId);
        return ResponseEntity.noContent().build();
    }

}
