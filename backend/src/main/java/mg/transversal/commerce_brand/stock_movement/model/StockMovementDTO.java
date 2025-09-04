package mg.transversal.commerce_brand.stock_movement.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class StockMovementDTO {

    private Integer stockMovementId;

    @NotNull
    @Size(max = 20)
    private String movementType;

    @NotNull
    @Digits(integer = 10, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "45.08")
    private BigDecimal quantity;

    @Digits(integer = 10, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "67.08")
    private BigDecimal unitCost;

    @Digits(integer = 12, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "75.08")
    private BigDecimal totalCost;

    @Size(max = 255)
    private String reason;

    @Size(max = 50)
    private String lotNumber;

    private LocalDate expiryDate;

    private OffsetDateTime movementDate;

    private String notes;

    @NotNull
    private Integer company;

    @NotNull
    private Integer product;

}
