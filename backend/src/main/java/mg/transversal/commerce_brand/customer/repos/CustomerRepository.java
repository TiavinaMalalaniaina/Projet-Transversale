package mg.transversal.commerce_brand.customer.repos;

import mg.transversal.commerce_brand.customer.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Customer findFirstByCompanyCompanyId(Integer companyId);

}
