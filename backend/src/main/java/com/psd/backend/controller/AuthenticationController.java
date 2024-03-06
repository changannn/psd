package com.psd.backend.controller;

import com.psd.backend.auth.AuthenticationRequest;
import com.psd.backend.auth.RegisterRequest;
import com.psd.backend.auth.VerificationRequest;
import com.psd.backend.auth.AuthenticationResponse;
import com.psd.backend.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    // To register
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest request) {
        var response = authenticationService.register(request);
        return ResponseEntity.ok(response);
    }

    // To login
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@Valid @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    // To verify MFA
    @PostMapping("/verify")
    public ResponseEntity<AuthenticationResponse> verifyCode(@RequestBody VerificationRequest verificationRequest) {
        return ResponseEntity.ok(authenticationService.verifyCode(verificationRequest));
    }

    @PostMapping("/update")
    public ResponseEntity<AuthenticationResponse> update(@Valid @RequestBody RegisterRequest request) {
        var response = authenticationService.update(request);
        return ResponseEntity.ok(response);
    }
}
