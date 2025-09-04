package mg.transversal.commerce_brand.discount.service;

import java.util.List;
import mg.transversal.commerce_brand.company.domain.Company;
import mg.transversal.commerce_brand.company.repos.CompanyRepository;
import mg.transversal.commerce_brand.customer.domain.Customer;
import mg.transversal.commerce_brand.customer.repos.CustomerRepository;
import mg.transversal.commerce_brand.discount.domain.Discount;
import mg.transversal.commerce_brand.discount.model.DiscountDTO;
import mg.transversal.commerce_brand.discount.repos.DiscountRepository;
import mg.transversal.commerce_brand.events.BeforeDeleteCompany;
import mg.transversal.commerce_brand.events.BeforeDeleteCustomer;
import mg.transversal.commerce_brand.events.BeforeDeleteProduct;
import mg.transversal.commerce_brand.product.domain.Product;
import mg.transversal.commerce_brand.product.repos.ProductRepository;
import mg.transversal.commerce_brand.util.NotFoundException;
import mg.transversal.commerce_brand.util.ReferencedException;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class DiscountService {

    private final DiscountRepository discountRepository;
    private final CompanyRepository companyRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;

    public DiscountService(final DiscountRepository discountRepository,
            final CompanyRepository companyRepository, final ProductRepository productRepository,
            final CustomerRepository customerRepository) {
        this.discountRepository = discountRepository;
        this.companyRepository = companyRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
    }

    public List<DiscountDTO> findAll() {
        final List<Discount> discounts = discountRepository.findAll(Sort.by("discountId"));
        return discounts.stream()
                .map(discount -> mapToDTO(discount, new DiscountDTO()))
                .toList();
    }

    public DiscountDTO get(final Integer discountId) {
        return discountRepository.findById(discountId)
                .map(discount -> mapToDTO(discount, new DiscountDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final DiscountDTO discountDTO) {
        final Discount discount = new Discount();
        mapToEntity(discountDTO, discount);
        return discountRepository.save(discount).getDiscountId();
    }

    public void update(final Integer discountId, final DiscountDTO discountDTO) {
        final Discount discount = discountRepository.findById(discountId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(discountDTO, discount);
        discountRepository.save(discount);
    }

    public void delete(final Integer discountId) {
        final Discount discount = discountRepository.findById(discountId)
                .orElseThrow(NotFoundException::new);
        discountRepository.delete(discount);
    }

    private DiscountDTO mapToDTO(final Discount discount, final DiscountDTO discountDTO) {
        discountDTO.setDiscountId(discount.getDiscountId());
        discountDTO.setDiscountName(discount.getDiscountName());
        discountDTO.setDiscountValue(discount.getDiscountValue());
        discountDTO.setStartDate(discount.getStartDate());
        discountDTO.setEndDate(discount.getEndDate());
        discountDTO.setIsActive(discount.getIsActive());
        discountDTO.setCompany(discount.getCompany() == null ? null : discount.getCompany().getCompanyId());
        discountDTO.setProduct(discount.getProduct() == null ? null : discount.getProduct().getProductId());
        discountDTO.setCustomer(discount.getCustomer() == null ? null : discount.getCustomer().getCustomerId());
        return discountDTO;
    }

    private Discount mapToEntity(final DiscountDTO discountDTO, final Discount discount) {
        discount.setDiscountName(discountDTO.getDiscountName());
        discount.setDiscountValue(discountDTO.getDiscountValue());
        discount.setStartDate(discountDTO.getStartDate());
        discount.setEndDate(discountDTO.getEndDate());
        discount.setIsActive(discountDTO.getIsActive());
        final Company company = discountDTO.getCompany() == null ? null : companyRepository.findById(discountDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        discount.setCompany(company);
        final Product product = discountDTO.getProduct() == null ? null : productRepository.findById(discountDTO.getProduct())
                .orElseThrow(() -> new NotFoundException("product not found"));
        discount.setProduct(product);
        final Customer customer = discountDTO.getCustomer() == null ? null : customerRepository.findById(discountDTO.getCustomer())
                .orElseThrow(() -> new NotFoundException("customer not found"));
        discount.setCustomer(customer);
        return discount;
    }

    @EventListener(BeforeDeleteCompany.class)
    public void on(final BeforeDeleteCompany event) {
        final ReferencedException referencedException = new ReferencedException();
        final Discount companyDiscount = discountRepository.findFirstByCompanyCompanyId(event.getCompanyId());
        if (companyDiscount != null) {
            referencedException.setKey("company.discount.company.referenced");
            referencedException.addParam(companyDiscount.getDiscountId());
            throw referencedException;
        }
    }

    @EventListener(BeforeDeleteProduct.class)
    public void on(final BeforeDeleteProduct event) {
        final ReferencedException referencedException = new ReferencedException();
        final Discount productDiscount = discountRepository.findFirstByProductProductId(event.getProductId());
        if (productDiscount != null) {
            referencedException.setKey("product.discount.product.referenced");
            referencedException.addParam(productDiscount.getDiscountId());
            throw referencedException;
        }
    }

    @EventListener(BeforeDeleteCustomer.class)
    public void on(final BeforeDeleteCustomer event) {
        final ReferencedException referencedException = new ReferencedException();
        final Discount customerDiscount = discountRepository.findFirstByCustomerCustomerId(event.getCustomerId());
        if (customerDiscount != null) {
            referencedException.setKey("customer.discount.customer.referenced");
            referencedException.addParam(customerDiscount.getDiscountId());
            throw referencedException;
        }
    }

}
