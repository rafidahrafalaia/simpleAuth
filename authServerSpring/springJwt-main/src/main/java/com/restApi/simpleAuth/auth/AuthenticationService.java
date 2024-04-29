package com.restApi.simpleAuth.auth;


import com.restApi.simpleAuth.dto.AuthenticationResponseDTO;
import com.restApi.simpleAuth.model.Token;
import com.restApi.simpleAuth.model.User;
import com.restApi.simpleAuth.repository.TokenRepository;
import com.restApi.simpleAuth.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final TokenRepository tokenRepository;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository repository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 TokenRepository tokenRepository,
                                 AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponseDTO register(User request) {

        // check if user already exist. if exist than authenticate the user

        if(repository.findByUsername(request.getUsername()).isPresent()) {
            return new AuthenticationResponseDTO(null, null,"User already exist");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));


        user.setRole(request.getRole());

        user = repository.save(user);

        String jwt = jwtService.generateToken(user);

        saveUserToken(jwt, user);

        return new AuthenticationResponseDTO(jwt, user, "User registration was successful");

    }

    public AuthenticationResponseDTO authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = repository.findByUsername(request.getUsername()).orElseThrow();
        System.out.print(user+" mknkjn");
        String jwt = jwtService.generateToken(user);

        revokeAllTokenByUser(user);
        saveUserToken(jwt, user);

        User thisUser = new User();
        thisUser.setEmail(user.getEmail());
        thisUser.setUsername(user.getUsername());
        return new AuthenticationResponseDTO(jwt, thisUser, "User login was successful");

    }
    private void revokeAllTokenByUser(User user) {
        List<Token> validTokens = tokenRepository.findAllTokensByUser(user.getId());
        if(validTokens.isEmpty()) {
            return;
        }

        tokenRepository.saveAll(validTokens);
    }
    private void saveUserToken(String jwt, User user) {
        Token token = new Token();
        token.setToken(jwt);
        token.setUser(user);
        tokenRepository.save(token);
    }
}
