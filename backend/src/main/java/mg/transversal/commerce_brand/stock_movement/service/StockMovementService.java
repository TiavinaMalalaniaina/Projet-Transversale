package mg.transversal.commerce_brand.stock_movement.service;

import java.util.List;
import mg.transversal.commerce_brand.company.domain.Company;
import mg.transversal.commerce_brand.company.repos.CompanyRepository;
import mg.transversal.commerce_brand.events.BeforeDeleteCompany;
import mg.transversal.commerce_brand.events.BeforeDeleteProduct;
import mg.transversal.commerce_brand.product.domain.Product;
import mg.transversal.commerce_brand.product.repos.ProductRepository;
import mg.transversal.commerce_brand.stock_movement.domain.StockMovement;
import mg.transversal.commerce_brand.stock_movement.model.StockMovementDTO;
import mg.transversal.commerce_brand.stock_movement.repos.StockMovementRepository;
import mg.transversal.commerce_brand.util.NotFoundException;
import mg.transversal.commerce_brand.util.ReferencedException;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class StockMovementService {

    private final StockMovementRepository stockMovementRepository;
    private final CompanyRepository companyRepository;
    private final ProductRepository productRepository;

    public StockMovementService(final StockMovementRepository stockMovementRepository,
            final CompanyRepository companyRepository, final ProductRepository productRepository) {
        this.stockMovementRepository = stockMovementRepository;
        this.companyRepository = companyRepository;
        this.productRepository = productRepository;
    }

    public List<StockMovementDTO> findAll() {
        final List<StockMovement> stockMovements = stockMovementRepository.findAll(Sort.by("stockMovementId"));
        return stockMovements.stream()
                .map(stockMovement -> mapToDTO(stockMovement, new StockMovementDTO()))
                .toList();
    }

    public StockMovementDTO get(final Integer stockMovementId) {
        return stockMovementRepository.findById(stockMovementId)
                .map(stockMovement -> mapToDTO(stockMovement, new StockMovementDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final StockMovementDTO stockMovementDTO) {
        final StockMovement stockMovement = new StockMovement();
        mapToEntity(stockMovementDTO, stockMovement);
        return stockMovementRepository.save(stockMovement).getStockMovementId();
    }

    public void update(final Integer stockMovementId, final StockMovementDTO stockMovementDTO) {
        final StockMovement stockMovement = stockMovementRepository.findById(stockMovementId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(stockMovementDTO, stockMovement);
        stockMovementRepository.save(stockMovement);
    }

    public void delete(final Integer stockMovementId) {
        final StockMovement stockMovement = stockMovementRepository.findById(stockMovementId)
                .orElseThrow(NotFoundException::new);
        stockMovementRepository.delete(stockMovement);
    }

    private StockMovementDTO mapToDTO(final StockMovement stockMovement,
            final StockMovementDTO stockMovementDTO) {
        stockMovementDTO.setStockMovementId(stockMovement.getStockMovementId());
        stockMovementDTO.setMovementType(stockMovement.getMovementType());
        stockMovementDTO.setQuantity(stockMovement.getQuantity());
        stockMovementDTO.setUnitCost(stockMovement.getUnitCost());
        stockMovementDTO.setTotalCost(stockMovement.getTotalCost());
        stockMovementDTO.setReason(stockMovement.getReason());
        stockMovementDTO.setLotNumber(stockMovement.getLotNumber());
        stockMovementDTO.setExpiryDate(stockMovement.getExpiryDate());
        stockMovementDTO.setMovementDate(stockMovement.getMovementDate());
        stockMovementDTO.setNotes(stockMovement.getNotes());
        stockMovementDTO.setCompany(stockMovement.getCompany() == null ? null : stockMovement.getCompany().getCompanyId());
        stockMovementDTO.setProduct(stockMovement.getProduct() == null ? null : stockMovement.getProduct().getProductId());
        return stockMovementDTO;
    }

    private StockMovement mapToEntity(final StockMovementDTO stockMovementDTO,
            final StockMovement stockMovement) {
        stockMovement.setMovementType(stockMovementDTO.getMovementType());
        stockMovement.setQuantity(stockMovementDTO.getQuantity());
        stockMovement.setUnitCost(stockMovementDTO.getUnitCost());
        stockMovement.setTotalCost(stockMovementDTO.getTotalCost());
        stockMovement.setReason(stockMovementDTO.getReason());
        stockMovement.setLotNumber(stockMovementDTO.getLotNumber());
        stockMovement.setExpiryDate(stockMovementDTO.getExpiryDate());
        stockMovement.setMovementDate(stockMovementDTO.getMovementDate());
        stockMovement.setNotes(stockMovementDTO.getNotes());
        final Company company = stockMovementDTO.getCompany() == null ? null : companyRepository.findById(stockMovementDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        stockMovement.setCompany(company);
        final Product product = stockMovementDTO.getProduct() == null ? null : productRepository.findById(stockMovementDTO.getProduct())
                .orElseThrow(() -> new NotFoundException("product not found"));
        stockMovement.setProduct(product);
        return stockMovement;
    }

    @EventListener(BeforeDeleteCompany.class)
    public void on(final BeforeDeleteCompany event) {
        final ReferencedException referencedException = new ReferencedException();
        final StockMovement companyStockMovement = stockMovementRepository.findFirstByCompanyCompanyId(event.getCompanyId());
        if (companyStockMovement != null) {
            referencedException.setKey("company.stockMovement.company.referenced");
            referencedException.addParam(companyStockMovement.getStockMovementId());
            throw referencedException;
        }
    }

    @EventListener(BeforeDeleteProduct.class)
    public void on(final BeforeDeleteProduct event) {
        final ReferencedException referencedException = new ReferencedException();
        final StockMovement productStockMovement = stockMovementRepository.findFirstByProductProductId(event.getProductId());
        if (productStockMovement != null) {
            referencedException.setKey("product.stockMovement.product.referenced");
            referencedException.addParam(productStockMovement.getStockMovementId());
            throw referencedException;
        }
    }

}
