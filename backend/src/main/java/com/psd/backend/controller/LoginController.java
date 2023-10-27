package com.psd.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.psd.backend.model.FrontendResponse;
import com.psd.backend.model.User;
import com.psd.backend.respository.userRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {
    
    @Autowired
    private userRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<FrontendResponse> login(@RequestBody User currentuser){
        String username = currentuser.getUsername();
        String password = currentuser.getPassword();
        String role = currentuser.getRole();

        User user = userRepository.findByUsername(username);

        if (user != null && password.equals(user.getPassword())) {
            // Authentication is successful. You can generate a token or return success response.
            // For token-based authentication, you might want to use JWT (JSON Web Tokens).
            // requires SALT + Hash
            // token
            // if admin show dashboard, if user show user related stuff
            FrontendResponse response = new FrontendResponse("Login success.");
            return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
        } else {
            // Authentication failed. Return an error response to the client.
            if (user == null || !password.equals(user.getPassword())) {
            // Authentication failed. Return an error response.
            // requires SALT + Hash
            FrontendResponse response = new FrontendResponse("Authentication failed. Invalid username or password.");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
        }
        return null;
    }

}
