package com.movies.controller;

import com.movies.controller.entity.AuthResponse;
import com.movies.controller.entity.LoginRequest;
import com.movies.controller.entity.SignUpRequest;
import com.movies.entity.User;
import com.movies.service.UserService;
import com.movies.spring.WebSecurityConfig;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        var userOptional = userService.validUsernameAndPassword(loginRequest.username(), loginRequest.password());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(new AuthResponse(user.getId(), user.getRole()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUp(@RequestBody SignUpRequest signUpRequest) {
        if (userService.hasUserWithUsername(signUpRequest.username())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        User user = userService.register(createUser(signUpRequest));
        return ResponseEntity.ok(new AuthResponse(user.getId(), user.getRole()));
    }

    private User createUser(SignUpRequest signUpRequest) {
        User user = new User();
        user.setPassword(signUpRequest.password());
        user.setUsername(signUpRequest.username());
        user.setRole(WebSecurityConfig.USER);
        return user;
    }
}