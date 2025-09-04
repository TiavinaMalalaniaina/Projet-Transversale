package mg.transversal.commerce_brand.unit.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UnitDTO {

    private Integer unitId;

    @NotNull
    @Size(max = 20)
    private String unitName;

    @Size(max = 100)
    private String description;

    @NotNull
    private Integer company;

}
