package mg.transversal.commerce_brand.product.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import mg.transversal.commerce_brand.category.domain.Category;
import mg.transversal.commerce_brand.company.domain.Company;
import mg.transversal.commerce_brand.discount.domain.Discount;
import mg.transversal.commerce_brand.order_line.domain.OrderLine;
import mg.transversal.commerce_brand.product_image.domain.ProductImage;
import mg.transversal.commerce_brand.stock_movement.domain.StockMovement;
import mg.transversal.commerce_brand.unit.domain.Unit;


@Entity
@Getter
@Setter
public class Product {

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
    private Integer productId;

    @Column(nullable = false, length = 100)
    private String productName;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal sellingPrice;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal minStock;

    @Column(nullable = false, length = 50)
    private String sku;

    @Column(length = 100)
    private String barcode;

    @Column(columnDefinition = "text")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id", nullable = false)
    private Unit unit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "product")
    private Set<ProductImage> productProductImages = new HashSet<>();

    @OneToMany(mappedBy = "product")
    private Set<OrderLine> productOrderLines = new HashSet<>();

    @OneToMany(mappedBy = "product")
    private Set<Discount> productDiscounts = new HashSet<>();

    @OneToMany(mappedBy = "product")
    private Set<StockMovement> productStockMovements = new HashSet<>();

}
