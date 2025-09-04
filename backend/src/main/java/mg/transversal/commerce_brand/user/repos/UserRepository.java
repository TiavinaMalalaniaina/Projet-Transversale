package mg.transversal.commerce_brand.user.repos;

import mg.transversal.commerce_brand.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Integer> {

    User findFirstByCompanyCompanyId(Integer companyId);

}
