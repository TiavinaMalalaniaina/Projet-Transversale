package mg.transversal.commerce_brand.company.service;

import java.util.List;
import mg.transversal.commerce_brand.company.domain.Company;
import mg.transversal.commerce_brand.company.model.CompanyDTO;
import mg.transversal.commerce_brand.company.repos.CompanyRepository;
import mg.transversal.commerce_brand.events.BeforeDeleteCompany;
import mg.transversal.commerce_brand.util.NotFoundException;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final ApplicationEventPublisher publisher;

    public CompanyService(final CompanyRepository companyRepository,
            final ApplicationEventPublisher publisher) {
        this.companyRepository = companyRepository;
        this.publisher = publisher;
    }

    public List<CompanyDTO> findAll() {
        final List<Company> companies = companyRepository.findAll(Sort.by("companyId"));
        return companies.stream()
                .map(company -> mapToDTO(company, new CompanyDTO()))
                .toList();
    }

    public CompanyDTO get(final Integer companyId) {
        return companyRepository.findById(companyId)
                .map(company -> mapToDTO(company, new CompanyDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final CompanyDTO companyDTO) {
        final Company company = new Company();
        mapToEntity(companyDTO, company);
        return companyRepository.save(company).getCompanyId();
    }

    public void update(final Integer companyId, final CompanyDTO companyDTO) {
        final Company company = companyRepository.findById(companyId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(companyDTO, company);
        companyRepository.save(company);
    }

    public void delete(final Integer companyId) {
        final Company company = companyRepository.findById(companyId)
                .orElseThrow(NotFoundException::new);
        publisher.publishEvent(new BeforeDeleteCompany(companyId));
        companyRepository.delete(company);
    }

    private CompanyDTO mapToDTO(final Company company, final CompanyDTO companyDTO) {
        companyDTO.setCompanyId(company.getCompanyId());
        companyDTO.setCompanyName(company.getCompanyName());
        return companyDTO;
    }

    private Company mapToEntity(final CompanyDTO companyDTO, final Company company) {
        company.setCompanyName(companyDTO.getCompanyName());
        return company;
    }

}
