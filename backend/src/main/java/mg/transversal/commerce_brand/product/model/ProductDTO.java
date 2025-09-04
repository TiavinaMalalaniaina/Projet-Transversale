package mg.transversal.commerce_brand.product.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ProductDTO {

    private Integer productId;

    @NotNull
    @Size(max = 100)
    private String productName;

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
    @Size(max = 50)
    private String sku;

    @Size(max = 100)
    private String barcode;

    private String description;

    @NotNull
    private Integer company;

    @NotNull
    private Integer unit;

    @NotNull
    private Integer category;

}
