package mg.transversal.commerce_brand.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EntityScan("mg.transversal.commerce_brand")
@EnableJpaRepositories("mg.transversal.commerce_brand")
@EnableTransactionManagement
public class DomainConfig {
}
