package mg.transversal.commerce_brand.mapper;

import org.mapstruct.Mapper;

import mg.transversal.commerce_brand.product.domain.ProductWithCurrentStock;
import mg.transversal.commerce_brand.product.model.ProductWithCurrentStockDTO;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    // Product toProduct(CreateProductWithStockInitDTO productDTO);
    ProductWithCurrentStockDTO toDTO(ProductWithCurrentStock entity);
}
