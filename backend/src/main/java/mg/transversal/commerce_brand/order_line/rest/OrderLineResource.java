package mg.transversal.commerce_brand.order_line.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import mg.transversal.commerce_brand.order_line.model.OrderLineDTO;
import mg.transversal.commerce_brand.order_line.service.OrderLineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/orderLines", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderLineResource {

    private final OrderLineService orderLineService;

    public OrderLineResource(final OrderLineService orderLineService) {
        this.orderLineService = orderLineService;
    }

    @GetMapping
    public ResponseEntity<List<OrderLineDTO>> getAllOrderLines() {
        return ResponseEntity.ok(orderLineService.findAll());
    }

    @GetMapping("/{orderLineId}")
    public ResponseEntity<OrderLineDTO> getOrderLine(
            @PathVariable(name = "orderLineId") final Integer orderLineId) {
        return ResponseEntity.ok(orderLineService.get(orderLineId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Integer> createOrderLine(
            @RequestBody @Valid final OrderLineDTO orderLineDTO) {
        final Integer createdOrderLineId = orderLineService.create(orderLineDTO);
        return new ResponseEntity<>(createdOrderLineId, HttpStatus.CREATED);
    }

    @PutMapping("/{orderLineId}")
    public ResponseEntity<Integer> updateOrderLine(
            @PathVariable(name = "orderLineId") final Integer orderLineId,
            @RequestBody @Valid final OrderLineDTO orderLineDTO) {
        orderLineService.update(orderLineId, orderLineDTO);
        return ResponseEntity.ok(orderLineId);
    }

    @DeleteMapping("/{orderLineId}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteOrderLine(
            @PathVariable(name = "orderLineId") final Integer orderLineId) {
        orderLineService.delete(orderLineId);
        return ResponseEntity.noContent().build();
    }

}
