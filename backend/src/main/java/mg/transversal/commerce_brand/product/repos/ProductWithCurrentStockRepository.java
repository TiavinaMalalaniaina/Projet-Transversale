package mg.transversal.commerce_brand.product.repos;

import mg.transversal.commerce_brand.product.domain.Product;
import mg.transversal.commerce_brand.product.domain.ProductWithCurrentStock;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductWithCurrentStockRepository extends JpaRepository<ProductWithCurrentStock, Integer> {

    List<ProductWithCurrentStock> findByCompanyId(Integer companyId);

}
