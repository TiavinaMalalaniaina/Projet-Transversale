package mg.transversal.commerce_brand.company.repos;

import mg.transversal.commerce_brand.company.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CompanyRepository extends JpaRepository<Company, Integer> {
}
