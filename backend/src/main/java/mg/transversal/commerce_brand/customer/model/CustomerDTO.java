package mg.transversal.commerce_brand.customer.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CustomerDTO {

    private Integer customerId;

    @Size(max = 20)
    private String customerCode;

    @NotNull
    @Size(max = 100)
    private String fullName;

    @Size(max = 100)
    private String email;

    @Size(max = 20)
    private String phoneNumber;

    @Size(max = 200)
    private String address;

    @NotNull
    private Integer company;

}
