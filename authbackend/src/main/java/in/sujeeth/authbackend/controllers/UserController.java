package in.sujeeth.authbackend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping
    public ResponseEntity<?> userEndpoint() {
        return ResponseEntity.ok(Map.of(
                "message", "Welcome USER",
                "role", "USER"));
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyUser(Authentication auth) {
        String username = auth.getName();
        Set<String> roles = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        boolean isUser = roles.contains("ROLE_USER");

        return ResponseEntity.ok(Map.of(
                "verified", isUser,
                "username", username,
                "roles", roles,
                "message", isUser ? "Authenticated as USER" : "Not a USER"
        ));
    }
}
