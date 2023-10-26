package com.psd.backend.controller;

import com.psd.backend.model.RegistrationResponse;
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
    public ResponseEntity<RegistrationResponse> register(@RequestBody User currentuser){

        // validation required
        String username = currentuser.getUsername();
        String password = currentuser.getPassword();
        String email = currentuser.getEmail();
        // add other register info below

        // Check if the username is already in use
        if (userRepository.findByUsername(username) != null) {
            RegistrationResponse response = new RegistrationResponse("Username already in use.");
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
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

        RegistrationResponse response = new RegistrationResponse("Registration successful. User created.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
