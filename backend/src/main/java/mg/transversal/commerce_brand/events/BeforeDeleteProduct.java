package mg.transversal.commerce_brand.events;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class BeforeDeleteProduct {

    private Integer productId;

}
