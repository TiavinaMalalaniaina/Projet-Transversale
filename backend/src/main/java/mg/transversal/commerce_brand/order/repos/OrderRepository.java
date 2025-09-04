package mg.transversal.commerce_brand.order.repos;

import mg.transversal.commerce_brand.order.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderRepository extends JpaRepository<Order, Integer> {

    Order findFirstByCompanyCompanyId(Integer companyId);

    Order findFirstByCustomerCustomerId(Integer customerId);

}
