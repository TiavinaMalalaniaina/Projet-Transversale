package mg.transversal.commerce_brand.category.repos;

import mg.transversal.commerce_brand.category.domain.Category;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Category findFirstByCompanyCompanyId(Integer companyId);
    List<Category> findByCompanyCompanyId(Integer companyId);

}
