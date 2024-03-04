package com.psd.backend.controller;

import java.util.List;

import com.psd.backend.auth.EmailVerificationResponse;
import com.psd.backend.auth.RegisterRequest;
import com.psd.backend.exceptions.AccountNotPermittedException;
import com.psd.backend.model.*;
import com.psd.backend.service.EmailSenderService;
import com.psd.backend.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.psd.backend.service.UserService;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class UserController {
    
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final EmailSenderService emailSenderService;

    @Autowired
    public UserController(UserService userService, JwtService jwtService, PasswordEncoder passwordEncoder, EmailSenderService emailSenderService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.emailSenderService = emailSenderService;
    }

//    @GetMapping("/users")
//    public List<User> getUsers(){
//        return userService.getUsers();
//    }

    // Endpoint for root account to update account user
    @PutMapping("/users/{id}")
    public ResponseEntity<String> updateUserById(@RequestBody UpdateRequest updateRequest, @PathVariable("id") int id, HttpServletRequest request){
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // Extract jwt and extract username from the jwt
        jwt = authHeader.substring(7);
        username = jwtService.extractUsername(jwt);

        // Check if user belongs to root account
        User root = userService.findByUsername(username);
        List<User> accountUsers = userService.getAccountUsers(root);
        User user = userService.getUserById(id);

        if (accountUsers.contains(user)) {
            userService.updateUser(updateRequest, id);
            return ResponseEntity.ok("User updated successfully");
        } else {
            throw new AccountNotPermittedException("Account unauthorised to edit user");
        }
    }

    // Endpoint for root account to delete account user
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") int id, HttpServletRequest request){
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // Extract jwt and extract username from the jwt
        jwt = authHeader.substring(7);
        username = jwtService.extractUsername(jwt);

        // Check if user belongs to root account
        User root = userService.findByUsername(username);
        List<User> accountUsers = userService.getAccountUsers(root);
        User user = userService.getUserById(id);

        if (accountUsers.contains(user)) {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully");
        } else {
            throw new AccountNotPermittedException("Account unauthorised to view user");
        }
    }

    // Endpoint to get root account user details
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable("id") int id, HttpServletRequest request){
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // Extract jwt and extract username from the jwt
        jwt = authHeader.substring(7);
        username = jwtService.extractUsername(jwt);

        // Check if user belongs to root account
        User root = userService.findByUsername(username);
        List<User> accountUsers = userService.getAccountUsers(root);
        User user = userService.getUserById(id);

        if (accountUsers.contains(user)) {
            return user;
        } else {
            throw new AccountNotPermittedException("Account unauthorised to view user");
        }

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
        // reduce user limit?
        // If role is admin, add creation limit

        // Create a dummy user with actual email
        User currentUser = User.builder()
                .email(registerRequest.getEmail())
                .role(registerRequest.getRole())
                .userCreationLimit(0)
                .createdBy(owner)
                .isEnabled(false)
                .build();

        userService.save(currentUser);

        // Create verification token for user and save to database
        Confirmation confirmation = new Confirmation(currentUser);
        userService.saveConfirmation(confirmation);

        // Send email to user
        this.emailSenderService.sendEmail(currentUser.getEmail(), "Account Verification", "Your administrator has invited you to access the wizvision application. Please click the link below to activate your user account.\n\n" +
                getVerificationUrl("http://localhost:4200", confirmation.getToken()) + "\n\nWizvision Pte Ltd");
        return ResponseEntity.ok("An invitation email has been sent to the user");
    }

    public String getVerificationUrl(String host, String token) {
        return host + "/email-verification?token=" + token;
    }

    @PostMapping("/auth/sendemail")
    public ResponseEntity<String> sendEmail(@RequestBody EmailMessage emailMessage) {
        this.emailSenderService.sendEmail(emailMessage.getTo(), emailMessage.getSubject(), emailMessage.getMessage());
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/auth/confirm")
    public ResponseEntity<EmailVerificationResponse> confirmUserAccount(@RequestParam("token") String token) {
        String email = userService.getEmailByToken(token);
        Boolean isSuccess = userService.verifyToken(token);
        EmailVerificationResponse response;

        if (isSuccess) {
            response = EmailVerificationResponse.builder()
                    .email(email)
                    .build();
            return ResponseEntity.ok(response);
        } else {
            throw new BadCredentialsException("Verification failed. Please try again or request a new confirmation email.");
        }
    }
}
