package mg.transversal.commerce_brand.events;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class BeforeDeleteCustomer {

    private Integer customerId;

}
