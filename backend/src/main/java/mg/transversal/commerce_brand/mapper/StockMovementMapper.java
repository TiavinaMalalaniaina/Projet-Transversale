package mg.transversal.commerce_brand.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import mg.transversal.commerce_brand.product.model.CreateProductWithStockInitDTO;
import mg.transversal.commerce_brand.stock_movement.domain.StockMovement;

@Mapper(componentModel = "spring")
public interface StockMovementMapper {
    
    // @Mapping(source = "quantity", target = "quantity")
    // @Mapping(source = "unitCost", target = "unitCost")
    // @Mapping(source = "company", target = "reason")
    // StockMovement toStockMovement(CreateProductWithStockInitDTO createProductWithStockInitDTO);
}
