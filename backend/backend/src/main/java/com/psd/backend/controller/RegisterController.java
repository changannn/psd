package com.psd.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.psd.backend.model.User;
import com.psd.backend.respository.userRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RegisterController {

     @Autowired
    private userRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> regiser(@RequestBody User currentuser){

        // validation required
        String username = currentuser.getUserame();
        String password = currentuser.getPassword();
        String email = currentuser.getEmail();
        // add other register info below

        // Check if the username is already in use
        if (userRepository.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already in use.");
        }

        // Create a new user entity and save it to the database
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(password);
        newUser.setRole("admin");
        // Set other user information below

        // save to database
        userRepository.save(newUser);

        return ResponseEntity.ok("Registration successful. User created.");
    }

}
