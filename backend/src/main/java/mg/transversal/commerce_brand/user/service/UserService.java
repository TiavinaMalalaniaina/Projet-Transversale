package mg.transversal.commerce_brand.user.service;

import java.util.List;
import mg.transversal.commerce_brand.company.domain.Company;
import mg.transversal.commerce_brand.company.repos.CompanyRepository;
import mg.transversal.commerce_brand.events.BeforeDeleteCompany;
import mg.transversal.commerce_brand.user.domain.User;
import mg.transversal.commerce_brand.user.model.UserDTO;
import mg.transversal.commerce_brand.user.repos.UserRepository;
import mg.transversal.commerce_brand.util.NotFoundException;
import mg.transversal.commerce_brand.util.ReferencedException;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    public UserService(final UserRepository userRepository,
            final CompanyRepository companyRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    public List<UserDTO> findAll() {
        final List<User> users = userRepository.findAll(Sort.by("userId"));
        return users.stream()
                .map(user -> mapToDTO(user, new UserDTO()))
                .toList();
    }

    public UserDTO get(final Integer userId) {
        return userRepository.findById(userId)
                .map(user -> mapToDTO(user, new UserDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final UserDTO userDTO) {
        final User user = new User();
        mapToEntity(userDTO, user);
        return userRepository.save(user).getUserId();
    }

    public void update(final Integer userId, final UserDTO userDTO) {
        final User user = userRepository.findById(userId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(userDTO, user);
        userRepository.save(user);
    }

    public void delete(final Integer userId) {
        final User user = userRepository.findById(userId)
                .orElseThrow(NotFoundException::new);
        userRepository.delete(user);
    }

    private UserDTO mapToDTO(final User user, final UserDTO userDTO) {
        userDTO.setUserId(user.getUserId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setFullName(user.getFullName());
        userDTO.setCompany(user.getCompany() == null ? null : user.getCompany().getCompanyId());
        return userDTO;
    }

    private User mapToEntity(final UserDTO userDTO, final User user) {
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setFullName(userDTO.getFullName());
        final Company company = userDTO.getCompany() == null ? null : companyRepository.findById(userDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        user.setCompany(company);
        return user;
    }

    @EventListener(BeforeDeleteCompany.class)
    public void on(final BeforeDeleteCompany event) {
        final ReferencedException referencedException = new ReferencedException();
        final User companyUser = userRepository.findFirstByCompanyCompanyId(event.getCompanyId());
        if (companyUser != null) {
            referencedException.setKey("company.user.company.referenced");
            referencedException.addParam(companyUser.getUserId());
            throw referencedException;
        }
    }

}
