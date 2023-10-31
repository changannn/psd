package com.psd.backend.controller;

import java.util.List;

import com.psd.backend.validation.LoginValidationGroup;
import com.psd.backend.validation.RegistrationValidationGroup;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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
import com.psd.backend.respository.userRepository;
import com.psd.backend.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Rest API CRUD
    @PostMapping("/add")
    public User createUser(@RequestBody User user){
        User currentUser = userService.createUser(user);
        return currentUser;
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

    // register
    @PostMapping("/register")
    public ResponseEntity<FrontendResponse> register(@Validated(RegistrationValidationGroup.class) @RequestBody User currentuser){

        // validation required
        String username = currentuser.getUsername();
        String password = currentuser.getPassword();
        String email = currentuser.getEmail();
        // add other register info below

        // Check if the username is already in use
        if (userService.findByUsername(username) != null) {
            FrontendResponse response = new FrontendResponse("Username already in use.");
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }

        // Create a new user entity and save it to the database
        User newUser = new User(username, email, password, "ROLE_ROOT");
        // Set other user information below

        // save to database
        userService.save(newUser);

        FrontendResponse response = new FrontendResponse("Registration successful. User created.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // login
    @PostMapping("/login")
    public ResponseEntity<FrontendResponse> login(@Validated(LoginValidationGroup.class) @RequestBody User currentuser){
        String username = currentuser.getUsername();
        String password = currentuser.getPassword();
        String role = currentuser.getRole();

        User user = userService.findByUsername(username);

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
