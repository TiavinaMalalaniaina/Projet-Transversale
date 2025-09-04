package mg.transversal.commerce_brand.stock_movement.repos;

import mg.transversal.commerce_brand.stock_movement.domain.StockMovement;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StockMovementRepository extends JpaRepository<StockMovement, Integer> {

    StockMovement findFirstByCompanyCompanyId(Integer companyId);

    StockMovement findFirstByProductProductId(Integer productId);

}
