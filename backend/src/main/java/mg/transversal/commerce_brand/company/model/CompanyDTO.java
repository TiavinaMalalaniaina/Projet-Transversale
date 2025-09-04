package mg.transversal.commerce_brand.company.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CompanyDTO {

    private Integer companyId;

    @NotNull
    @Size(max = 100)
    private String companyName;

}
