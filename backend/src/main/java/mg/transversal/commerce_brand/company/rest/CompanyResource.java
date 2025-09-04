package mg.transversal.commerce_brand.company.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import mg.transversal.commerce_brand.company.model.CompanyDTO;
import mg.transversal.commerce_brand.company.service.CompanyService;
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
@RequestMapping(value = "/api/companies", produces = MediaType.APPLICATION_JSON_VALUE)
public class CompanyResource {

    private final CompanyService companyService;

    public CompanyResource(final CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    public ResponseEntity<List<CompanyDTO>> getAllCompanies() {
        return ResponseEntity.ok(companyService.findAll());
    }

    @GetMapping("/{companyId}")
    public ResponseEntity<CompanyDTO> getCompany(
            @PathVariable(name = "companyId") final Integer companyId) {
        return ResponseEntity.ok(companyService.get(companyId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Integer> createCompany(@RequestBody @Valid final CompanyDTO companyDTO) {
        final Integer createdCompanyId = companyService.create(companyDTO);
        return new ResponseEntity<>(createdCompanyId, HttpStatus.CREATED);
    }

    @PutMapping("/{companyId}")
    public ResponseEntity<Integer> updateCompany(
            @PathVariable(name = "companyId") final Integer companyId,
            @RequestBody @Valid final CompanyDTO companyDTO) {
        companyService.update(companyId, companyDTO);
        return ResponseEntity.ok(companyId);
    }

    @DeleteMapping("/{companyId}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCompany(
            @PathVariable(name = "companyId") final Integer companyId) {
        companyService.delete(companyId);
        return ResponseEntity.noContent().build();
    }

}
