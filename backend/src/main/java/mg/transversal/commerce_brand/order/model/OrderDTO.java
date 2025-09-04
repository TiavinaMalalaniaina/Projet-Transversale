package mg.transversal.commerce_brand.order.model;

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
public class OrderDTO {

    private Integer orderId;

    @NotNull
    @Size(max = 20)
    private String orderNumber;

    private OffsetDateTime orderDate;

    @NotNull
    @Size(max = 200)
    private String deliveryAddress;

    private LocalDate deliveryDate;

    @NotNull
    @Size(max = 20)
    private String orderStatus;

    @NotNull
    @Size(max = 20)
    private String paymentStatus;

    @NotNull
    @Digits(integer = 12, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "52.08")
    private BigDecimal totalAmount;

    @NotNull
    @Digits(integer = 12, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "16.08")
    private BigDecimal deliveryAmount;

    @Digits(integer = 12, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "67.08")
    private BigDecimal discountAmount;

    @Digits(integer = 12, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "57.08")
    private BigDecimal taxAmount;

    private String notes;

    @NotNull
    private Integer company;

    @NotNull
    private Integer customer;

}
