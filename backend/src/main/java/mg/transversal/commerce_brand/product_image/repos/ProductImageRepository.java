package mg.transversal.commerce_brand.product_image.repos;

import mg.transversal.commerce_brand.product_image.domain.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {

    ProductImage findFirstByProductProductId(Integer productId);

}
