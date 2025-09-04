package mg.transversal.commerce_brand.discount.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import mg.transversal.commerce_brand.discount.model.DiscountDTO;
import mg.transversal.commerce_brand.discount.service.DiscountService;
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
@RequestMapping(value = "/api/discounts", produces = MediaType.APPLICATION_JSON_VALUE)
public class DiscountResource {

    private final DiscountService discountService;

    public DiscountResource(final DiscountService discountService) {
        this.discountService = discountService;
    }

    @GetMapping
    public ResponseEntity<List<DiscountDTO>> getAllDiscounts() {
        return ResponseEntity.ok(discountService.findAll());
    }

    @GetMapping("/{discountId}")
    public ResponseEntity<DiscountDTO> getDiscount(
            @PathVariable(name = "discountId") final Integer discountId) {
        return ResponseEntity.ok(discountService.get(discountId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Integer> createDiscount(
            @RequestBody @Valid final DiscountDTO discountDTO) {
        final Integer createdDiscountId = discountService.create(discountDTO);
        return new ResponseEntity<>(createdDiscountId, HttpStatus.CREATED);
    }

    @PutMapping("/{discountId}")
    public ResponseEntity<Integer> updateDiscount(
            @PathVariable(name = "discountId") final Integer discountId,
            @RequestBody @Valid final DiscountDTO discountDTO) {
        discountService.update(discountId, discountDTO);
        return ResponseEntity.ok(discountId);
    }

    @DeleteMapping("/{discountId}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteDiscount(
            @PathVariable(name = "discountId") final Integer discountId) {
        discountService.delete(discountId);
        return ResponseEntity.noContent().build();
    }

}
