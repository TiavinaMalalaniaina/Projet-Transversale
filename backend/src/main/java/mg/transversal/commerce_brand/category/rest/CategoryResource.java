package mg.transversal.commerce_brand.category.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import mg.transversal.commerce_brand.category.model.CategoryDTO;
import mg.transversal.commerce_brand.category.service.CategoryService;
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
@RequestMapping(value = "/api/categories", produces = MediaType.APPLICATION_JSON_VALUE)
public class CategoryResource {

    private final CategoryService categoryService;

    public CategoryResource(final CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<CategoryDTO>> getCategoriesByCompanyId(
            @PathVariable(name = "companyId") final Integer companyId) {
        return ResponseEntity.ok(categoryService.findCategoriesByCompanyId(companyId));
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryDTO> getCategory(
            @PathVariable(name = "categoryId") final Integer categoryId) {
        return ResponseEntity.ok(categoryService.get(categoryId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Integer> createCategory(
            @RequestBody @Valid final CategoryDTO categoryDTO) {
        final Integer createdCategoryId = categoryService.create(categoryDTO);
        return new ResponseEntity<>(createdCategoryId, HttpStatus.CREATED);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<Integer> updateCategory(
            @PathVariable(name = "categoryId") final Integer categoryId,
            @RequestBody @Valid final CategoryDTO categoryDTO) {
        categoryService.update(categoryId, categoryDTO);
        return ResponseEntity.ok(categoryId);
    }

    @DeleteMapping("/{categoryId}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCategory(
            @PathVariable(name = "categoryId") final Integer categoryId) {
        categoryService.delete(categoryId);
        return ResponseEntity.noContent().build();
    }

}
