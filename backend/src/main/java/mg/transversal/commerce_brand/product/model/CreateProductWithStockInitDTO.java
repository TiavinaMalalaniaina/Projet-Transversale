package mg.transversal.commerce_brand.product.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import lombok.Getter;
import lombok.Setter;
import mg.transversal.commerce_brand.enums.StockMovementType;
import mg.transversal.commerce_brand.stock_movement.model.StockMovementDTO;
import mg.transversal.commerce_brand.stock_movement.utils.StockMovementUtils;

@Getter
@Setter
public class CreateProductWithStockInitDTO extends ProductDTO {

    @NotNull
    @Digits(integer = 10, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "45.08")
    private BigDecimal quantity;

    @Digits(integer = 10, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "67.08")
    private BigDecimal unitCost;

    @Column
    private OffsetDateTime movementDate;

    public StockMovementDTO toStockMovementDTO() {
        StockMovementDTO dto = new StockMovementDTO();
        dto.setCompany(this.getCompany());
        dto.setQuantity(this.getQuantity());
        dto.setUnitCost(this.getUnitCost());
        dto.setMovementDate(this.getMovementDate());
        dto.setMovementType(StockMovementType.IN);
        dto.setReason("Initialisation du stock");
        dto.setProduct(this.getProductId());
        dto.setNotes("");
        return dto;
    }
}
