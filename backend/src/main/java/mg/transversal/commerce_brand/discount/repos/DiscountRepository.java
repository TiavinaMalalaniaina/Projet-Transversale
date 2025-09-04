package mg.transversal.commerce_brand.discount.repos;

import mg.transversal.commerce_brand.discount.domain.Discount;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DiscountRepository extends JpaRepository<Discount, Integer> {

    Discount findFirstByCompanyCompanyId(Integer companyId);

    Discount findFirstByProductProductId(Integer productId);

    Discount findFirstByCustomerCustomerId(Integer customerId);

}
