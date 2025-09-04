package mg.transversal.commerce_brand.order.service;

import java.util.List;
import mg.transversal.commerce_brand.company.domain.Company;
import mg.transversal.commerce_brand.company.repos.CompanyRepository;
import mg.transversal.commerce_brand.customer.domain.Customer;
import mg.transversal.commerce_brand.customer.repos.CustomerRepository;
import mg.transversal.commerce_brand.events.BeforeDeleteCompany;
import mg.transversal.commerce_brand.events.BeforeDeleteCustomer;
import mg.transversal.commerce_brand.events.BeforeDeleteOrder;
import mg.transversal.commerce_brand.order.domain.Order;
import mg.transversal.commerce_brand.order.model.OrderDTO;
import mg.transversal.commerce_brand.order.repos.OrderRepository;
import mg.transversal.commerce_brand.util.NotFoundException;
import mg.transversal.commerce_brand.util.ReferencedException;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CompanyRepository companyRepository;
    private final CustomerRepository customerRepository;
    private final ApplicationEventPublisher publisher;

    public OrderService(final OrderRepository orderRepository,
            final CompanyRepository companyRepository, final CustomerRepository customerRepository,
            final ApplicationEventPublisher publisher) {
        this.orderRepository = orderRepository;
        this.companyRepository = companyRepository;
        this.customerRepository = customerRepository;
        this.publisher = publisher;
    }

    public List<OrderDTO> findAll() {
        final List<Order> orders = orderRepository.findAll(Sort.by("orderId"));
        return orders.stream()
                .map(order -> mapToDTO(order, new OrderDTO()))
                .toList();
    }

    public OrderDTO get(final Integer orderId) {
        return orderRepository.findById(orderId)
                .map(order -> mapToDTO(order, new OrderDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final OrderDTO orderDTO) {
        final Order order = new Order();
        mapToEntity(orderDTO, order);
        return orderRepository.save(order).getOrderId();
    }

    public void update(final Integer orderId, final OrderDTO orderDTO) {
        final Order order = orderRepository.findById(orderId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(orderDTO, order);
        orderRepository.save(order);
    }

    public void delete(final Integer orderId) {
        final Order order = orderRepository.findById(orderId)
                .orElseThrow(NotFoundException::new);
        publisher.publishEvent(new BeforeDeleteOrder(orderId));
        orderRepository.delete(order);
    }

    private OrderDTO mapToDTO(final Order order, final OrderDTO orderDTO) {
        orderDTO.setOrderId(order.getOrderId());
        orderDTO.setOrderNumber(order.getOrderNumber());
        orderDTO.setOrderDate(order.getOrderDate());
        orderDTO.setDeliveryAddress(order.getDeliveryAddress());
        orderDTO.setDeliveryDate(order.getDeliveryDate());
        orderDTO.setOrderStatus(order.getOrderStatus());
        orderDTO.setPaymentStatus(order.getPaymentStatus());
        orderDTO.setTotalAmount(order.getTotalAmount());
        orderDTO.setDeliveryAmount(order.getDeliveryAmount());
        orderDTO.setDiscountAmount(order.getDiscountAmount());
        orderDTO.setTaxAmount(order.getTaxAmount());
        orderDTO.setNotes(order.getNotes());
        orderDTO.setCompany(order.getCompany() == null ? null : order.getCompany().getCompanyId());
        orderDTO.setCustomer(order.getCustomer() == null ? null : order.getCustomer().getCustomerId());
        return orderDTO;
    }

    private Order mapToEntity(final OrderDTO orderDTO, final Order order) {
        order.setOrderNumber(orderDTO.getOrderNumber());
        order.setOrderDate(orderDTO.getOrderDate());
        order.setDeliveryAddress(orderDTO.getDeliveryAddress());
        order.setDeliveryDate(orderDTO.getDeliveryDate());
        order.setOrderStatus(orderDTO.getOrderStatus());
        order.setPaymentStatus(orderDTO.getPaymentStatus());
        order.setTotalAmount(orderDTO.getTotalAmount());
        order.setDeliveryAmount(orderDTO.getDeliveryAmount());
        order.setDiscountAmount(orderDTO.getDiscountAmount());
        order.setTaxAmount(orderDTO.getTaxAmount());
        order.setNotes(orderDTO.getNotes());
        final Company company = orderDTO.getCompany() == null ? null : companyRepository.findById(orderDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        order.setCompany(company);
        final Customer customer = orderDTO.getCustomer() == null ? null : customerRepository.findById(orderDTO.getCustomer())
                .orElseThrow(() -> new NotFoundException("customer not found"));
        order.setCustomer(customer);
        return order;
    }

    @EventListener(BeforeDeleteCompany.class)
    public void on(final BeforeDeleteCompany event) {
        final ReferencedException referencedException = new ReferencedException();
        final Order companyOrder = orderRepository.findFirstByCompanyCompanyId(event.getCompanyId());
        if (companyOrder != null) {
            referencedException.setKey("company.order.company.referenced");
            referencedException.addParam(companyOrder.getOrderId());
            throw referencedException;
        }
    }

    @EventListener(BeforeDeleteCustomer.class)
    public void on(final BeforeDeleteCustomer event) {
        final ReferencedException referencedException = new ReferencedException();
        final Order customerOrder = orderRepository.findFirstByCustomerCustomerId(event.getCustomerId());
        if (customerOrder != null) {
            referencedException.setKey("customer.order.customer.referenced");
            referencedException.addParam(customerOrder.getOrderId());
            throw referencedException;
        }
    }

}
