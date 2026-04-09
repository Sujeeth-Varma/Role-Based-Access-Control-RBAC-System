package in.sujeeth.authbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import in.sujeeth.authbackend.entities.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);
}
