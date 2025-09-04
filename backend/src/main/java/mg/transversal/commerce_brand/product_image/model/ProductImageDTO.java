package mg.transversal.commerce_brand.product_image.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ProductImageDTO {

    private Integer productImageId;

    private String imageData;

    @JsonProperty("isPrimary")
    private Boolean isPrimary;

    @NotNull
    private Integer product;

}
