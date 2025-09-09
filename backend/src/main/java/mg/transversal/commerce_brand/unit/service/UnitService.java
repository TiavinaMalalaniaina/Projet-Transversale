package mg.transversal.commerce_brand.unit.service;

import java.util.List;
import mg.transversal.commerce_brand.company.domain.Company;
import mg.transversal.commerce_brand.company.repos.CompanyRepository;
import mg.transversal.commerce_brand.events.BeforeDeleteCompany;
import mg.transversal.commerce_brand.events.BeforeDeleteUnit;
import mg.transversal.commerce_brand.unit.domain.Unit;
import mg.transversal.commerce_brand.unit.model.UnitDTO;
import mg.transversal.commerce_brand.unit.repos.UnitRepository;
import mg.transversal.commerce_brand.util.NotFoundException;
import mg.transversal.commerce_brand.util.ReferencedException;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class UnitService {

    private final UnitRepository unitRepository;
    private final CompanyRepository companyRepository;
    private final ApplicationEventPublisher publisher;

    public UnitService(final UnitRepository unitRepository,
            final CompanyRepository companyRepository, final ApplicationEventPublisher publisher) {
        this.unitRepository = unitRepository;
        this.companyRepository = companyRepository;
        this.publisher = publisher;
    }

    public List<UnitDTO> findUnitsByCompanyId(final Integer companyId) {
        final List<Unit> units = unitRepository.findByCompanyCompanyId(companyId);
        return units.stream()
                .map(unit -> mapToDTO(unit, new UnitDTO()))
                .toList();
    }

    public List<UnitDTO> findAll() {
        final List<Unit> units = unitRepository.findAll(Sort.by("unitId"));
        return units.stream()
                .map(unit -> mapToDTO(unit, new UnitDTO()))
                .toList();
    }

    public UnitDTO get(final Integer unitId) {
        return unitRepository.findById(unitId)
                .map(unit -> mapToDTO(unit, new UnitDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final UnitDTO unitDTO) {
        final Unit unit = new Unit();
        mapToEntity(unitDTO, unit);
        return unitRepository.save(unit).getUnitId();
    }

    public void update(final Integer unitId, final UnitDTO unitDTO) {
        final Unit unit = unitRepository.findById(unitId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(unitDTO, unit);
        unitRepository.save(unit);
    }

    public void delete(final Integer unitId) {
        final Unit unit = unitRepository.findById(unitId)
                .orElseThrow(NotFoundException::new);
        publisher.publishEvent(new BeforeDeleteUnit(unitId));
        unitRepository.delete(unit);
    }

    private UnitDTO mapToDTO(final Unit unit, final UnitDTO unitDTO) {
        unitDTO.setUnitId(unit.getUnitId());
        unitDTO.setUnitName(unit.getUnitName());
        unitDTO.setDescription(unit.getDescription());
        unitDTO.setCompany(unit.getCompany() == null ? null : unit.getCompany().getCompanyId());
        return unitDTO;
    }

    private Unit mapToEntity(final UnitDTO unitDTO, final Unit unit) {
        unit.setUnitName(unitDTO.getUnitName());
        unit.setDescription(unitDTO.getDescription());
        final Company company = unitDTO.getCompany() == null ? null : companyRepository.findById(unitDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        unit.setCompany(company);
        return unit;
    }

    @EventListener(BeforeDeleteCompany.class)
    public void on(final BeforeDeleteCompany event) {
        final ReferencedException referencedException = new ReferencedException();
        final Unit companyUnit = unitRepository.findFirstByCompanyCompanyId(event.getCompanyId());
        if (companyUnit != null) {
            referencedException.setKey("company.unit.company.referenced");
            referencedException.addParam(companyUnit.getUnitId());
            throw referencedException;
        }
    }

}
