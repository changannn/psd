package com.psd.backend.service;

import com.psd.backend.auth.AuthenticationRequest;
import com.psd.backend.auth.RegisterRequest;
import com.psd.backend.auth.VerificationRequest;
import com.psd.backend.auth.AuthenticationResponse;
import com.psd.backend.model.Role;
import com.psd.backend.model.User;
import com.psd.backend.respository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
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
    private final MfaService mfaService;

    public AuthenticationResponse register(RegisterRequest request) {
        // Create user with encrypted password and save to database
        User user = new User(request.getUsername(), request.getEmail(), passwordEncoder.encode(request.getPassword()), Role.ROOT, request.isMfaEnabled());
        userRepository.save(user);

        // If MFA enabled, generate secret for MFA
        if (request.isMfaEnabled()){
            user.setSecret(mfaService.generateNewSecret());
        }

        // Generate a token to return to the user
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .secretImageUri(mfaService.generateQrCodeImageUri(user.getSecret()))
                .token(jwtToken)
                .mfaEnabled(user.getMfaEnabled())
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

        if (user.getMfaEnabled()) {
            return AuthenticationResponse.builder()
                .token("")
                .mfaEnabled(true)
                .build();
        }

        // Generate token to return to the user
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .mfaEnabled(false)
                .build();
    }

    public AuthenticationResponse verifyCode (VerificationRequest verificationRequest) {
        User user = userRepository.findByUsername(verificationRequest.getUsername());

        if (user == null) {
            throw new UsernameNotFoundException("User does not exist");
        }

        if (mfaService.isOtpNotValid(user.getSecret(), verificationRequest.getCode())) {
            throw new BadCredentialsException("Code is not correct");
        }

        // Generate token to return to the user
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .mfaEnabled(user.getMfaEnabled())
                .build();
    }
}
