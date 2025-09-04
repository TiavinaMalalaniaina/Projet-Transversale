package mg.transversal.commerce_brand.order.domain;

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
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import mg.transversal.commerce_brand.company.domain.Company;
import mg.transversal.commerce_brand.customer.domain.Customer;
import mg.transversal.commerce_brand.order_line.domain.OrderLine;


@Entity
@Table(name = "\"Order\"")
@Getter
@Setter
public class Order {

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
    private Integer orderId;

    @Column(nullable = false, length = 20)
    private String orderNumber;

    @Column
    private OffsetDateTime orderDate;

    @Column(nullable = false, length = 200)
    private String deliveryAddress;

    @Column
    private LocalDate deliveryDate;

    @Column(nullable = false, length = 20)
    private String orderStatus;

    @Column(nullable = false, length = 20)
    private String paymentStatus;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal deliveryAmount;

    @Column(precision = 12, scale = 2)
    private BigDecimal discountAmount;

    @Column(precision = 12, scale = 2)
    private BigDecimal taxAmount;

    @Column(columnDefinition = "text")
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @OneToMany(mappedBy = "order")
    private Set<OrderLine> orderOrderLines = new HashSet<>();

}
