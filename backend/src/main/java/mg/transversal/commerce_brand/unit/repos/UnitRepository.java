package mg.transversal.commerce_brand.unit.repos;

import mg.transversal.commerce_brand.unit.domain.Unit;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UnitRepository extends JpaRepository<Unit, Integer> {

    Unit findFirstByCompanyCompanyId(Integer companyId);

}
