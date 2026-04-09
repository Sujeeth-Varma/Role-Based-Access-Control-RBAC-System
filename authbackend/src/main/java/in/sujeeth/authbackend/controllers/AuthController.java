package in.sujeeth.authbackend.controllers;

import in.sujeeth.authbackend.dtos.SigninRequest;
import in.sujeeth.authbackend.dtos.SignupRequest;
import in.sujeeth.authbackend.dtos.LoginResponse;
import in.sujeeth.authbackend.entities.Roles;
import in.sujeeth.authbackend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/auth")
public class AuthController {

    private UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup/user")
    public ResponseEntity<LoginResponse> registerUser(@Valid @RequestBody SignupRequest request) {
        try {
            return ResponseEntity.ok(userService.signup(request, Roles.USER));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/signup/admin")
    public ResponseEntity<LoginResponse> registerAdmin(@Valid @RequestBody SignupRequest request) {
        try {
            return ResponseEntity.ok(userService.signup(request, Roles.ADMIN));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<LoginResponse> signin(@Valid @RequestBody SigninRequest request) {
        try {
            return ResponseEntity.ok(userService.signin(request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}