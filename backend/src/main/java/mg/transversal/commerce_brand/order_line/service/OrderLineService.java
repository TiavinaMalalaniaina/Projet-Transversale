package mg.transversal.commerce_brand.order_line.service;

import java.util.List;
import mg.transversal.commerce_brand.events.BeforeDeleteOrder;
import mg.transversal.commerce_brand.events.BeforeDeleteProduct;
import mg.transversal.commerce_brand.order.domain.Order;
import mg.transversal.commerce_brand.order.repos.OrderRepository;
import mg.transversal.commerce_brand.order_line.domain.OrderLine;
import mg.transversal.commerce_brand.order_line.model.OrderLineDTO;
import mg.transversal.commerce_brand.order_line.repos.OrderLineRepository;
import mg.transversal.commerce_brand.product.domain.Product;
import mg.transversal.commerce_brand.product.repos.ProductRepository;
import mg.transversal.commerce_brand.util.NotFoundException;
import mg.transversal.commerce_brand.util.ReferencedException;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class OrderLineService {

    private final OrderLineRepository orderLineRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderLineService(final OrderLineRepository orderLineRepository,
            final OrderRepository orderRepository, final ProductRepository productRepository) {
        this.orderLineRepository = orderLineRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public List<OrderLineDTO> findAll() {
        final List<OrderLine> orderLines = orderLineRepository.findAll(Sort.by("orderLineId"));
        return orderLines.stream()
                .map(orderLine -> mapToDTO(orderLine, new OrderLineDTO()))
                .toList();
    }

    public OrderLineDTO get(final Integer orderLineId) {
        return orderLineRepository.findById(orderLineId)
                .map(orderLine -> mapToDTO(orderLine, new OrderLineDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final OrderLineDTO orderLineDTO) {
        final OrderLine orderLine = new OrderLine();
        mapToEntity(orderLineDTO, orderLine);
        return orderLineRepository.save(orderLine).getOrderLineId();
    }

    public void update(final Integer orderLineId, final OrderLineDTO orderLineDTO) {
        final OrderLine orderLine = orderLineRepository.findById(orderLineId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(orderLineDTO, orderLine);
        orderLineRepository.save(orderLine);
    }

    public void delete(final Integer orderLineId) {
        final OrderLine orderLine = orderLineRepository.findById(orderLineId)
                .orElseThrow(NotFoundException::new);
        orderLineRepository.delete(orderLine);
    }

    private OrderLineDTO mapToDTO(final OrderLine orderLine, final OrderLineDTO orderLineDTO) {
        orderLineDTO.setOrderLineId(orderLine.getOrderLineId());
        orderLineDTO.setQuantity(orderLine.getQuantity());
        orderLineDTO.setUnitPrice(orderLine.getUnitPrice());
        orderLineDTO.setDiscountPercentage(orderLine.getDiscountPercentage());
        orderLineDTO.setDiscountAmount(orderLine.getDiscountAmount());
        orderLineDTO.setLineTotal(orderLine.getLineTotal());
        orderLineDTO.setNotes(orderLine.getNotes());
        orderLineDTO.setOrder(orderLine.getOrder() == null ? null : orderLine.getOrder().getOrderId());
        orderLineDTO.setProduct(orderLine.getProduct() == null ? null : orderLine.getProduct().getProductId());
        return orderLineDTO;
    }

    private OrderLine mapToEntity(final OrderLineDTO orderLineDTO, final OrderLine orderLine) {
        orderLine.setQuantity(orderLineDTO.getQuantity());
        orderLine.setUnitPrice(orderLineDTO.getUnitPrice());
        orderLine.setDiscountPercentage(orderLineDTO.getDiscountPercentage());
        orderLine.setDiscountAmount(orderLineDTO.getDiscountAmount());
        orderLine.setLineTotal(orderLineDTO.getLineTotal());
        orderLine.setNotes(orderLineDTO.getNotes());
        final Order order = orderLineDTO.getOrder() == null ? null : orderRepository.findById(orderLineDTO.getOrder())
                .orElseThrow(() -> new NotFoundException("order not found"));
        orderLine.setOrder(order);
        final Product product = orderLineDTO.getProduct() == null ? null : productRepository.findById(orderLineDTO.getProduct())
                .orElseThrow(() -> new NotFoundException("product not found"));
        orderLine.setProduct(product);
        return orderLine;
    }

    @EventListener(BeforeDeleteOrder.class)
    public void on(final BeforeDeleteOrder event) {
        final ReferencedException referencedException = new ReferencedException();
        final OrderLine orderOrderLine = orderLineRepository.findFirstByOrderOrderId(event.getOrderId());
        if (orderOrderLine != null) {
            referencedException.setKey("order.orderLine.order.referenced");
            referencedException.addParam(orderOrderLine.getOrderLineId());
            throw referencedException;
        }
    }

    @EventListener(BeforeDeleteProduct.class)
    public void on(final BeforeDeleteProduct event) {
        final ReferencedException referencedException = new ReferencedException();
        final OrderLine productOrderLine = orderLineRepository.findFirstByProductProductId(event.getProductId());
        if (productOrderLine != null) {
            referencedException.setKey("product.orderLine.product.referenced");
            referencedException.addParam(productOrderLine.getOrderLineId());
            throw referencedException;
        }
    }

}
