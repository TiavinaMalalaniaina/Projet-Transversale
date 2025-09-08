package mg.transversal.commerce_brand.product.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;
import mg.transversal.commerce_brand.enums.StockStatusEnum;
import mg.transversal.commerce_brand.product.domain.ProductWithCurrentStock;


@Getter
@Setter
public class ProductWithCurrentStockDTO {

    private Integer productId;

    @NotNull
    @Size(max = 100)
    private String productName;

    @NotNull
    @Size(max = 100)
    private String categoryName;

    @NotNull
    @Size(max = 100)
    private String unitName;

    @NotNull
    @Digits(integer = 10, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "39.08")
    private BigDecimal sellingPrice;

    @NotNull
    @Digits(integer = 10, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "52.08")
    private BigDecimal minStock;

    @NotNull
    @Digits(integer = 10, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "52.08")
    private BigDecimal currentStock;

    @NotNull
    @Size(max = 50)
    private String sku;

    @NotNull
    @Enumerated(EnumType.STRING)
    private StockStatusEnum status;

    // @NotNull
    // private Integer company;

    // @NotNull
    // private Integer unit;

    // @NotNull
    // private Integer category;

}
