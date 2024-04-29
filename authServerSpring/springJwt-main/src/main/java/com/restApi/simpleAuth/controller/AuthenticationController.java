package com.restApi.simpleAuth.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.restApi.simpleAuth.dto.AuthenticationResponseDTO;
import com.restApi.simpleAuth.model.User;
import com.restApi.simpleAuth.auth.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    private final AuthenticationService authService;

    public AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDTO> register(
            @RequestBody User request
            ) {
        logger.info("Received registration request for user: {}", request.getUsername());
        AuthenticationResponseDTO response = authService.register(request);
        logger.info("Registration successful for user: {}", request.getUsername());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(
            @RequestBody User request
    ) {
        logger.info("Received login request for user: {}", request.getUsername());
        AuthenticationResponseDTO response = authService.authenticate(request);
        System.out.println(response+" responseresponse");
        logger.info("Login successful for user: {}", request.getUsername());
        return ResponseEntity.ok(response);
    }
}
