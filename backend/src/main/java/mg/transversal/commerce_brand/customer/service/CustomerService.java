package mg.transversal.commerce_brand.customer.service;

import java.util.List;
import mg.transversal.commerce_brand.company.domain.Company;
import mg.transversal.commerce_brand.company.repos.CompanyRepository;
import mg.transversal.commerce_brand.customer.domain.Customer;
import mg.transversal.commerce_brand.customer.model.CustomerDTO;
import mg.transversal.commerce_brand.customer.repos.CustomerRepository;
import mg.transversal.commerce_brand.events.BeforeDeleteCompany;
import mg.transversal.commerce_brand.events.BeforeDeleteCustomer;
import mg.transversal.commerce_brand.util.NotFoundException;
import mg.transversal.commerce_brand.util.ReferencedException;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CompanyRepository companyRepository;
    private final ApplicationEventPublisher publisher;

    public CustomerService(final CustomerRepository customerRepository,
            final CompanyRepository companyRepository, final ApplicationEventPublisher publisher) {
        this.customerRepository = customerRepository;
        this.companyRepository = companyRepository;
        this.publisher = publisher;
    }

    public List<CustomerDTO> findAll() {
        final List<Customer> customers = customerRepository.findAll(Sort.by("customerId"));
        return customers.stream()
                .map(customer -> mapToDTO(customer, new CustomerDTO()))
                .toList();
    }

    public CustomerDTO get(final Integer customerId) {
        return customerRepository.findById(customerId)
                .map(customer -> mapToDTO(customer, new CustomerDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final CustomerDTO customerDTO) {
        final Customer customer = new Customer();
        mapToEntity(customerDTO, customer);
        return customerRepository.save(customer).getCustomerId();
    }

    public void update(final Integer customerId, final CustomerDTO customerDTO) {
        final Customer customer = customerRepository.findById(customerId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(customerDTO, customer);
        customerRepository.save(customer);
    }

    public void delete(final Integer customerId) {
        final Customer customer = customerRepository.findById(customerId)
                .orElseThrow(NotFoundException::new);
        publisher.publishEvent(new BeforeDeleteCustomer(customerId));
        customerRepository.delete(customer);
    }

    private CustomerDTO mapToDTO(final Customer customer, final CustomerDTO customerDTO) {
        customerDTO.setCustomerId(customer.getCustomerId());
        customerDTO.setCustomerCode(customer.getCustomerCode());
        customerDTO.setFullName(customer.getFullName());
        customerDTO.setEmail(customer.getEmail());
        customerDTO.setPhoneNumber(customer.getPhoneNumber());
        customerDTO.setAddress(customer.getAddress());
        customerDTO.setCompany(customer.getCompany() == null ? null : customer.getCompany().getCompanyId());
        return customerDTO;
    }

    private Customer mapToEntity(final CustomerDTO customerDTO, final Customer customer) {
        customer.setCustomerCode(customerDTO.getCustomerCode());
        customer.setFullName(customerDTO.getFullName());
        customer.setEmail(customerDTO.getEmail());
        customer.setPhoneNumber(customerDTO.getPhoneNumber());
        customer.setAddress(customerDTO.getAddress());
        final Company company = customerDTO.getCompany() == null ? null : companyRepository.findById(customerDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        customer.setCompany(company);
        return customer;
    }

    @EventListener(BeforeDeleteCompany.class)
    public void on(final BeforeDeleteCompany event) {
        final ReferencedException referencedException = new ReferencedException();
        final Customer companyCustomer = customerRepository.findFirstByCompanyCompanyId(event.getCompanyId());
        if (companyCustomer != null) {
            referencedException.setKey("company.customer.company.referenced");
            referencedException.addParam(companyCustomer.getCustomerId());
            throw referencedException;
        }
    }

}
