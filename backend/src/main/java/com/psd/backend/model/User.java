package com.psd.backend.model;

import com.psd.backend.validation.LoginValidationGroup;
import com.psd.backend.validation.RegistrationValidationGroup;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "user_table")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "username",unique = true)
    @NotBlank(message = "Username required", groups = {RegistrationValidationGroup.class, LoginValidationGroup.class})
    private String username;

    @Column(name = "email")
    @NotBlank(message = "Email required", groups = {RegistrationValidationGroup.class})
    @Email(message = "Invalid email address", groups = {RegistrationValidationGroup.class})
    private String email;

    @Column(name = "password")
    @NotBlank(message = "Password required", groups = {RegistrationValidationGroup.class, LoginValidationGroup.class})
    private String password;

    @Column(name = "role")
    private String role;

    // Define constructors
    public User() {

    }

    public User(String username, String email, String password, String role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Define Getters/Setters
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    
}
