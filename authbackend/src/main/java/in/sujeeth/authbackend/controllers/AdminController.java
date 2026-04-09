package in.sujeeth.authbackend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping
    public ResponseEntity<?> adminEndpoint() {
        return ResponseEntity.ok(Map.of(
                "message", "Welcome ADMIN",
                "role", "ADMIN"));
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyAdmin(Authentication auth) {
        String username = auth.getName();
        Set<String> roles = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        boolean isAdmin = roles.contains("ROLE_ADMIN");

        return ResponseEntity.ok(Map.of(
                "verified", isAdmin,
                "username", username,
                "roles", roles,
                "message", isAdmin ? "Authenticated as ADMIN" : "Not an ADMIN"
        ));
    }
}
