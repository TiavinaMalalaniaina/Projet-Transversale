package mg.transversal.commerce_brand.product.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;
import mg.transversal.commerce_brand.enums.StockStatusEnum;


@Entity
@Getter
@Setter
@Table(name = "v_current_stock")
public class ProductWithCurrentStock {

    @Id
    @Column(nullable = false, updatable = false)
    private Integer productId;

    @Column(nullable = false, updatable = false)
    private Integer companyId;

    @Column(nullable = false, length = 100)
    private String productName;

    @Column(nullable = false, length = 100)
    private String categoryName;

    @Column(nullable = false, length = 20)
    private String unitName;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal sellingPrice;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal currentStock;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal minStock;

    @Column(nullable = false, length = 50)
    private String sku;

    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private StockStatusEnum status;

    @Column(columnDefinition = "text")
    private String description;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "company_id", nullable = false)
    // private Company company;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "unit_id", nullable = false)
    // private Unit unit;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "category_id", nullable = false)
    // private Category category;

    // @OneToMany(mappedBy = "product")
    // private Set<ProductImage> productProductImages = new HashSet<>();

    // @OneToMany(mappedBy = "product")
    // private Set<OrderLine> productOrderLines = new HashSet<>();

    // @OneToMany(mappedBy = "product")
    // private Set<Discount> productDiscounts = new HashSet<>();

    // @OneToMany(mappedBy = "product")
    // private Set<StockMovement> productStockMovements = new HashSet<>();

}
