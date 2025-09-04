package mg.transversal.commerce_brand.order_line.repos;

import mg.transversal.commerce_brand.order_line.domain.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderLineRepository extends JpaRepository<OrderLine, Integer> {

    OrderLine findFirstByOrderOrderId(Integer orderId);

    OrderLine findFirstByProductProductId(Integer productId);

}
