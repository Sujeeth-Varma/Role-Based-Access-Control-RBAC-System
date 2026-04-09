package in.sujeeth.authbackend.services;

import in.sujeeth.authbackend.dtos.SigninRequest;
import in.sujeeth.authbackend.entities.Roles;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import in.sujeeth.authbackend.config.jwt.JwtUtils;
import in.sujeeth.authbackend.dtos.SignupRequest;
import in.sujeeth.authbackend.dtos.LoginResponse;
import in.sujeeth.authbackend.entities.User;
import in.sujeeth.authbackend.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public LoginResponse signup(SignupRequest request, Roles role) {
        String email = request.getEmail();
        String username = request.getUsername();
        if (userRepository.existsByEmail(email) || userRepository.existsByUsername(username)) {
            throw new RuntimeException("User already exists with given email id or username");
        }
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();
        userRepository.save(user);
        return signin(new SigninRequest(user.getEmail(), request.getPassword()));
    }

    public LoginResponse signin(SigninRequest request) {
        String username = userRepository.findByEmail(request.getEmail())
                .map(User::getUsername)
                .orElseThrow(() -> new UsernameNotFoundException("Email not found"));

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String token = jwtUtils.generateToken(userDetails);
        return new LoginResponse(token);
    }
}
