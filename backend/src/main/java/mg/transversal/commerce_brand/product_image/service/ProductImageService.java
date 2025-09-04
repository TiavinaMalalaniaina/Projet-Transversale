package mg.transversal.commerce_brand.product_image.service;

import java.util.List;
import mg.transversal.commerce_brand.events.BeforeDeleteProduct;
import mg.transversal.commerce_brand.product.domain.Product;
import mg.transversal.commerce_brand.product.repos.ProductRepository;
import mg.transversal.commerce_brand.product_image.domain.ProductImage;
import mg.transversal.commerce_brand.product_image.model.ProductImageDTO;
import mg.transversal.commerce_brand.product_image.repos.ProductImageRepository;
import mg.transversal.commerce_brand.util.NotFoundException;
import mg.transversal.commerce_brand.util.ReferencedException;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class ProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;

    public ProductImageService(final ProductImageRepository productImageRepository,
            final ProductRepository productRepository) {
        this.productImageRepository = productImageRepository;
        this.productRepository = productRepository;
    }

    public List<ProductImageDTO> findAll() {
        final List<ProductImage> productImages = productImageRepository.findAll(Sort.by("productImageId"));
        return productImages.stream()
                .map(productImage -> mapToDTO(productImage, new ProductImageDTO()))
                .toList();
    }

    public ProductImageDTO get(final Integer productImageId) {
        return productImageRepository.findById(productImageId)
                .map(productImage -> mapToDTO(productImage, new ProductImageDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final ProductImageDTO productImageDTO) {
        final ProductImage productImage = new ProductImage();
        mapToEntity(productImageDTO, productImage);
        return productImageRepository.save(productImage).getProductImageId();
    }

    public void update(final Integer productImageId, final ProductImageDTO productImageDTO) {
        final ProductImage productImage = productImageRepository.findById(productImageId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(productImageDTO, productImage);
        productImageRepository.save(productImage);
    }

    public void delete(final Integer productImageId) {
        final ProductImage productImage = productImageRepository.findById(productImageId)
                .orElseThrow(NotFoundException::new);
        productImageRepository.delete(productImage);
    }

    private ProductImageDTO mapToDTO(final ProductImage productImage,
            final ProductImageDTO productImageDTO) {
        productImageDTO.setProductImageId(productImage.getProductImageId());
        productImageDTO.setImageData(productImage.getImageData());
        productImageDTO.setIsPrimary(productImage.getIsPrimary());
        productImageDTO.setProduct(productImage.getProduct() == null ? null : productImage.getProduct().getProductId());
        return productImageDTO;
    }

    private ProductImage mapToEntity(final ProductImageDTO productImageDTO,
            final ProductImage productImage) {
        productImage.setImageData(productImageDTO.getImageData());
        productImage.setIsPrimary(productImageDTO.getIsPrimary());
        final Product product = productImageDTO.getProduct() == null ? null : productRepository.findById(productImageDTO.getProduct())
                .orElseThrow(() -> new NotFoundException("product not found"));
        productImage.setProduct(product);
        return productImage;
    }

    @EventListener(BeforeDeleteProduct.class)
    public void on(final BeforeDeleteProduct event) {
        final ReferencedException referencedException = new ReferencedException();
        final ProductImage productProductImage = productImageRepository.findFirstByProductProductId(event.getProductId());
        if (productProductImage != null) {
            referencedException.setKey("product.productImage.product.referenced");
            referencedException.addParam(productProductImage.getProductImageId());
            throw referencedException;
        }
    }

}
