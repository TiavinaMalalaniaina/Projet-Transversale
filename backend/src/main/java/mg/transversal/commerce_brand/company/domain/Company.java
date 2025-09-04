package mg.transversal.commerce_brand.company.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import mg.transversal.commerce_brand.category.domain.Category;
import mg.transversal.commerce_brand.customer.domain.Customer;
import mg.transversal.commerce_brand.discount.domain.Discount;
import mg.transversal.commerce_brand.order.domain.Order;
import mg.transversal.commerce_brand.product.domain.Product;
import mg.transversal.commerce_brand.stock_movement.domain.StockMovement;
import mg.transversal.commerce_brand.unit.domain.Unit;
import mg.transversal.commerce_brand.user.domain.User;


@Entity
@Getter
@Setter
public class Company {

    @Id
    @Column(nullable = false, updatable = false)
    @SequenceGenerator(
            name = "primary_sequence",
            sequenceName = "primary_sequence",
            allocationSize = 1,
            initialValue = 10000
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "primary_sequence"
    )
    private Integer companyId;

    @Column(nullable = false, length = 100)
    private String companyName;

    @OneToMany(mappedBy = "company")
    private Set<User> companyUsers = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<Unit> companyUnits = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<Category> companyCategories = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<Product> companyProducts = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<Customer> companyCustomers = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<Order> companyOrders = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<Discount> companyDiscounts = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<StockMovement> companyStockMovements = new HashSet<>();

}
