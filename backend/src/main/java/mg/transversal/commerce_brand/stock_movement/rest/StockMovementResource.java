package mg.transversal.commerce_brand.stock_movement.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import mg.transversal.commerce_brand.stock_movement.model.StockMovementDTO;
import mg.transversal.commerce_brand.stock_movement.service.StockMovementService;
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
@RequestMapping(value = "/api/stockMovements", produces = MediaType.APPLICATION_JSON_VALUE)
public class StockMovementResource {

    private final StockMovementService stockMovementService;

    public StockMovementResource(final StockMovementService stockMovementService) {
        this.stockMovementService = stockMovementService;
    }

    @GetMapping
    public ResponseEntity<List<StockMovementDTO>> getAllStockMovements() {
        return ResponseEntity.ok(stockMovementService.findAll());
    }

    @GetMapping("/{stockMovementId}")
    public ResponseEntity<StockMovementDTO> getStockMovement(
            @PathVariable(name = "stockMovementId") final Integer stockMovementId) {
        return ResponseEntity.ok(stockMovementService.get(stockMovementId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Integer> createStockMovement(
            @RequestBody @Valid final StockMovementDTO stockMovementDTO) {
        final Integer createdStockMovementId = stockMovementService.create(stockMovementDTO);
        return new ResponseEntity<>(createdStockMovementId, HttpStatus.CREATED);
    }

    @PutMapping("/{stockMovementId}")
    public ResponseEntity<Integer> updateStockMovement(
            @PathVariable(name = "stockMovementId") final Integer stockMovementId,
            @RequestBody @Valid final StockMovementDTO stockMovementDTO) {
        stockMovementService.update(stockMovementId, stockMovementDTO);
        return ResponseEntity.ok(stockMovementId);
    }

    @DeleteMapping("/{stockMovementId}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteStockMovement(
            @PathVariable(name = "stockMovementId") final Integer stockMovementId) {
        stockMovementService.delete(stockMovementId);
        return ResponseEntity.noContent().build();
    }

}
