package com.psd.backend.service;

import com.psd.backend.auth.AuthenticationRequest;
import com.psd.backend.auth.RegisterRequest;
import com.psd.backend.auth.AuthenticationResponse;
import com.psd.backend.model.Role;
import com.psd.backend.model.User;
import com.psd.backend.respository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        // Create user with encrypted password and save to database
        User user = new User(request.getUsername(), request.getEmail(),passwordEncoder.encode(request.getPassword()), Role.ROOT);
        userRepository.save(user);

        //Generate secret for MFA
        user.setSecret("");

        // Generate a token to return to the user
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // Authenticate user, throw exception if invalid
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        // Find the user
        User user = userRepository.findByUsername(request.getUsername());

        if (user == null) {
            throw new UsernameNotFoundException("User does not exist");
        }

        // Generate token to return to the user
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
