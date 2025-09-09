package mg.transversal.commerce_brand.product.service;

import java.util.List;
import mg.transversal.commerce_brand.category.domain.Category;
import mg.transversal.commerce_brand.category.repos.CategoryRepository;
import mg.transversal.commerce_brand.company.domain.Company;
import mg.transversal.commerce_brand.company.repos.CompanyRepository;
import mg.transversal.commerce_brand.enums.StockMovementType;
import mg.transversal.commerce_brand.events.BeforeDeleteCategory;
import mg.transversal.commerce_brand.events.BeforeDeleteCompany;
import mg.transversal.commerce_brand.events.BeforeDeleteProduct;
import mg.transversal.commerce_brand.events.BeforeDeleteUnit;
import mg.transversal.commerce_brand.mapper.ProductMapper;
import mg.transversal.commerce_brand.product.domain.Product;
import mg.transversal.commerce_brand.product.domain.ProductWithCurrentStock;
import mg.transversal.commerce_brand.product.model.CreateProductWithStockInitDTO;
import mg.transversal.commerce_brand.product.model.ProductDTO;
import mg.transversal.commerce_brand.product.model.ProductWithCurrentStockDTO;
import mg.transversal.commerce_brand.product.repos.ProductRepository;
import mg.transversal.commerce_brand.product.repos.ProductWithCurrentStockRepository;
import mg.transversal.commerce_brand.stock_movement.domain.StockMovement;
import mg.transversal.commerce_brand.stock_movement.model.StockMovementDTO;
import mg.transversal.commerce_brand.stock_movement.repos.StockMovementRepository;
import mg.transversal.commerce_brand.stock_movement.service.StockMovementService;
import mg.transversal.commerce_brand.stock_movement.utils.StockMovementUtils;
import mg.transversal.commerce_brand.unit.domain.Unit;
import mg.transversal.commerce_brand.unit.repos.UnitRepository;
import mg.transversal.commerce_brand.util.NotFoundException;
import mg.transversal.commerce_brand.util.ReferencedException;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class ProductService {

    private final StockMovementService stockMovementService;
    private final ProductRepository productRepository;
    private final CompanyRepository companyRepository;
    private final UnitRepository unitRepository;
    private final CategoryRepository categoryRepository;
    private final ProductWithCurrentStockRepository productWithCurrentStockRepository;
    private final ApplicationEventPublisher publisher;
    private final ProductMapper productMapper;

    public ProductService(final ProductRepository productRepository,
            final StockMovementService stockMovementService,
            final CompanyRepository companyRepository,
            final UnitRepository unitRepository,
            final CategoryRepository categoryRepository,
            final ProductWithCurrentStockRepository productWithCurrentStockRepository,
            final ProductMapper productMapper,
            final ApplicationEventPublisher publisher) {
        this.stockMovementService = stockMovementService;
        this.productRepository = productRepository;
        this.companyRepository = companyRepository;
        this.unitRepository = unitRepository;
        this.categoryRepository = categoryRepository;
        this.productWithCurrentStockRepository = productWithCurrentStockRepository;
        this.publisher = publisher;
        this.productMapper = productMapper;
    }

    public List<ProductWithCurrentStockDTO> findProductWithCurrentStockByCompanyId(final Integer companyId) {
        final List<ProductWithCurrentStock> products = productWithCurrentStockRepository.findByCompanyId(companyId);
        return products.stream()
                .map(product -> productMapper.toDTO(product))
                .toList();
    }

    @Transactional
    public Integer createProductWithStockMovement(final CreateProductWithStockInitDTO createProductWithStockInitDTO) {
        createProductWithStockInitDTO.setProductId(this.create(createProductWithStockInitDTO));
        stockMovementService.create(createProductWithStockInitDTO.toStockMovementDTO());
        return createProductWithStockInitDTO.getProductId();
    }

    public List<ProductDTO> findAll() {
        final List<Product> products = productRepository.findAll(Sort.by("productId"));
        return products.stream()
                .map(product -> mapToDTO(product, new ProductDTO()))
                .toList();
    }

    public ProductDTO get(final Integer productId) {
        return productRepository.findById(productId)
                .map(product -> mapToDTO(product, new ProductDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final ProductDTO productDTO) {
        final Product product = new Product();
        mapToEntity(productDTO, product);
        return productRepository.save(product).getProductId();
    }

    public void update(final Integer productId, final ProductDTO productDTO) {
        final Product product = productRepository.findById(productId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(productDTO, product);
        productRepository.save(product);
    }

    public void delete(final Integer productId) {
        final Product product = productRepository.findById(productId)
                .orElseThrow(NotFoundException::new);
        publisher.publishEvent(new BeforeDeleteProduct(productId));
        productRepository.delete(product);
    }

    private ProductDTO mapToDTO(final Product product, final ProductDTO productDTO) {
        productDTO.setProductId(product.getProductId());
        productDTO.setProductName(product.getProductName());
        productDTO.setSellingPrice(product.getSellingPrice());
        productDTO.setMinStock(product.getMinStock());
        productDTO.setSku(product.getSku());
        productDTO.setBarcode(product.getBarcode());
        productDTO.setDescription(product.getDescription());
        productDTO.setCompany(product.getCompany() == null ? null : product.getCompany().getCompanyId());
        productDTO.setUnit(product.getUnit() == null ? null : product.getUnit().getUnitId());
        productDTO.setCategory(product.getCategory() == null ? null : product.getCategory().getCategoryId());
        return productDTO;
    }

    private Product mapToEntity(final ProductDTO productDTO, final Product product) {
        product.setProductName(productDTO.getProductName());
        product.setSellingPrice(productDTO.getSellingPrice());
        product.setMinStock(productDTO.getMinStock());
        product.setSku(productDTO.getSku());
        product.setBarcode(productDTO.getBarcode());
        product.setDescription(productDTO.getDescription());
        final Company company = productDTO.getCompany() == null ? null
                : companyRepository.findById(productDTO.getCompany())
                        .orElseThrow(() -> new NotFoundException("company not found"));
        product.setCompany(company);
        final Unit unit = productDTO.getUnit() == null ? null
                : unitRepository.findById(productDTO.getUnit())
                        .orElseThrow(() -> new NotFoundException("unit not found"));
        product.setUnit(unit);
        final Category category = productDTO.getCategory() == null ? null
                : categoryRepository.findById(productDTO.getCategory())
                        .orElseThrow(() -> new NotFoundException("category not found"));
        product.setCategory(category);
        return product;
    }

    @EventListener(BeforeDeleteCompany.class)
    public void on(final BeforeDeleteCompany event) {
        final ReferencedException referencedException = new ReferencedException();
        final Product companyProduct = productRepository.findFirstByCompanyCompanyId(event.getCompanyId());
        if (companyProduct != null) {
            referencedException.setKey("company.product.company.referenced");
            referencedException.addParam(companyProduct.getProductId());
            throw referencedException;
        }
    }

    @EventListener(BeforeDeleteUnit.class)
    public void on(final BeforeDeleteUnit event) {
        final ReferencedException referencedException = new ReferencedException();
        final Product unitProduct = productRepository.findFirstByUnitUnitId(event.getUnitId());
        if (unitProduct != null) {
            referencedException.setKey("unit.product.unit.referenced");
            referencedException.addParam(unitProduct.getProductId());
            throw referencedException;
        }
    }

    @EventListener(BeforeDeleteCategory.class)
    public void on(final BeforeDeleteCategory event) {
        final ReferencedException referencedException = new ReferencedException();
        final Product categoryProduct = productRepository.findFirstByCategoryCategoryId(event.getCategoryId());
        if (categoryProduct != null) {
            referencedException.setKey("category.product.category.referenced");
            referencedException.addParam(categoryProduct.getProductId());
            throw referencedException;
        }
    }

}
