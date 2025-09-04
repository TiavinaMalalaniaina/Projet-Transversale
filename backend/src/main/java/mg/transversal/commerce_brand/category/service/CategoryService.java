package mg.transversal.commerce_brand.category.service;

import java.util.List;
import mg.transversal.commerce_brand.category.domain.Category;
import mg.transversal.commerce_brand.category.model.CategoryDTO;
import mg.transversal.commerce_brand.category.repos.CategoryRepository;
import mg.transversal.commerce_brand.company.domain.Company;
import mg.transversal.commerce_brand.company.repos.CompanyRepository;
import mg.transversal.commerce_brand.events.BeforeDeleteCategory;
import mg.transversal.commerce_brand.events.BeforeDeleteCompany;
import mg.transversal.commerce_brand.util.NotFoundException;
import mg.transversal.commerce_brand.util.ReferencedException;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CompanyRepository companyRepository;
    private final ApplicationEventPublisher publisher;

    public CategoryService(final CategoryRepository categoryRepository,
            final CompanyRepository companyRepository, final ApplicationEventPublisher publisher) {
        this.categoryRepository = categoryRepository;
        this.companyRepository = companyRepository;
        this.publisher = publisher;
    }

    public List<CategoryDTO> findAll() {
        final List<Category> categories = categoryRepository.findAll(Sort.by("categoryId"));
        return categories.stream()
                .map(category -> mapToDTO(category, new CategoryDTO()))
                .toList();
    }

    public CategoryDTO get(final Integer categoryId) {
        return categoryRepository.findById(categoryId)
                .map(category -> mapToDTO(category, new CategoryDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final CategoryDTO categoryDTO) {
        final Category category = new Category();
        mapToEntity(categoryDTO, category);
        return categoryRepository.save(category).getCategoryId();
    }

    public void update(final Integer categoryId, final CategoryDTO categoryDTO) {
        final Category category = categoryRepository.findById(categoryId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(categoryDTO, category);
        categoryRepository.save(category);
    }

    public void delete(final Integer categoryId) {
        final Category category = categoryRepository.findById(categoryId)
                .orElseThrow(NotFoundException::new);
        publisher.publishEvent(new BeforeDeleteCategory(categoryId));
        categoryRepository.delete(category);
    }

    private CategoryDTO mapToDTO(final Category category, final CategoryDTO categoryDTO) {
        categoryDTO.setCategoryId(category.getCategoryId());
        categoryDTO.setCategoryName(category.getCategoryName());
        categoryDTO.setDescription(category.getDescription());
        categoryDTO.setCompany(category.getCompany() == null ? null : category.getCompany().getCompanyId());
        return categoryDTO;
    }

    private Category mapToEntity(final CategoryDTO categoryDTO, final Category category) {
        category.setCategoryName(categoryDTO.getCategoryName());
        category.setDescription(categoryDTO.getDescription());
        final Company company = categoryDTO.getCompany() == null ? null : companyRepository.findById(categoryDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        category.setCompany(company);
        return category;
    }

    @EventListener(BeforeDeleteCompany.class)
    public void on(final BeforeDeleteCompany event) {
        final ReferencedException referencedException = new ReferencedException();
        final Category companyCategory = categoryRepository.findFirstByCompanyCompanyId(event.getCompanyId());
        if (companyCategory != null) {
            referencedException.setKey("company.category.company.referenced");
            referencedException.addParam(companyCategory.getCategoryId());
            throw referencedException;
        }
    }

}
