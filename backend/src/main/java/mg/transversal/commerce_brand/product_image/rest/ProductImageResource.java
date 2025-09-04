package mg.transversal.commerce_brand.product_image.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import mg.transversal.commerce_brand.product_image.model.ProductImageDTO;
import mg.transversal.commerce_brand.product_image.service.ProductImageService;
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
@RequestMapping(value = "/api/productImages", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProductImageResource {

    private final ProductImageService productImageService;

    public ProductImageResource(final ProductImageService productImageService) {
        this.productImageService = productImageService;
    }

    @GetMapping
    public ResponseEntity<List<ProductImageDTO>> getAllProductImages() {
        return ResponseEntity.ok(productImageService.findAll());
    }

    @GetMapping("/{productImageId}")
    public ResponseEntity<ProductImageDTO> getProductImage(
            @PathVariable(name = "productImageId") final Integer productImageId) {
        return ResponseEntity.ok(productImageService.get(productImageId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Integer> createProductImage(
            @RequestBody @Valid final ProductImageDTO productImageDTO) {
        final Integer createdProductImageId = productImageService.create(productImageDTO);
        return new ResponseEntity<>(createdProductImageId, HttpStatus.CREATED);
    }

    @PutMapping("/{productImageId}")
    public ResponseEntity<Integer> updateProductImage(
            @PathVariable(name = "productImageId") final Integer productImageId,
            @RequestBody @Valid final ProductImageDTO productImageDTO) {
        productImageService.update(productImageId, productImageDTO);
        return ResponseEntity.ok(productImageId);
    }

    @DeleteMapping("/{productImageId}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteProductImage(
            @PathVariable(name = "productImageId") final Integer productImageId) {
        productImageService.delete(productImageId);
        return ResponseEntity.noContent().build();
    }

}
