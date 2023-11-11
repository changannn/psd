package com.psd.backend.controller;

import java.util.List;

import com.psd.backend.auth.RegisterRequest;
import com.psd.backend.exceptions.AccountNotPermittedException;
import com.psd.backend.model.Role;
import com.psd.backend.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.psd.backend.model.FrontendResponse;
import com.psd.backend.model.User;
import com.psd.backend.service.UserService;

@RestController
public class UserController {
    
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/users")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @PutMapping("/update/{id}")
    public User updateUserById(@RequestBody User user, @PathVariable("id") int id){
        return userService.updateUser(user, id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") int id){
        userService.deleteUser(id);
        return "User deleted successfully...";
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable("id") int id){
        return userService.getUserById(id);
    }

    // Endpoint for root account to get account users
    @GetMapping("/profile")
    public List<User> getAccountUsers(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // Extract jwt and extract username from the jwt
        jwt = authHeader.substring(7);
        username = jwtService.extractUsername(jwt);

        // Find root account and return account users
        User user = userService.findByUsername(username);
        return userService.getAccountUsers(user);
    }

    // Endpoint for root account to create users
    @PostMapping("/users")
    public ResponseEntity<String> createUser(@RequestBody RegisterRequest registerRequest, HttpServletRequest request){
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;
        final User owner;

        // Extract jwt and extract username from the jwt
        jwt = authHeader.substring(7);
        username = jwtService.extractUsername(jwt);
        owner = userService.findByUsername(username);

        // Check if account is root account
        if (owner.getRole() != Role.ROOT) {
            throw new AccountNotPermittedException("Account unauthorised to create users");
        } else if (owner.getUserCreationLimit() == 0) {
            throw new AccountNotPermittedException("Users limit reached");
        }

        User currentUser = User.builder()
                .email(registerRequest.getEmail())
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(registerRequest.getRole())
                .userCreationLimit(0)
                .createdBy(owner)
                .build();

        // Insert user into database
        userService.createUser(currentUser);
        owner.setUserCreationLimit(owner.getUserCreationLimit() - 1);

        return new ResponseEntity<>("User created", HttpStatus.CREATED);
    }
}
