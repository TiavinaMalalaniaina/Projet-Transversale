package mg.transversal.commerce_brand.category.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CategoryDTO {

    private Integer categoryId;

    @NotNull
    @Size(max = 50)
    private String categoryName;

    @Size(max = 255)
    private String description;

    @NotNull
    private Integer company;

}
