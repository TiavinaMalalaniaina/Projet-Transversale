package mg.transversal.commerce_brand.product.repos;

import mg.transversal.commerce_brand.product.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product, Integer> {

    Product findFirstByCompanyCompanyId(Integer companyId);

    Product findFirstByUnitUnitId(Integer unitId);

    Product findFirstByCategoryCategoryId(Integer categoryId);

}
