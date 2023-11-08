package com.psd.backend.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "Username required")
    private String username;

    @NotBlank(message = "Password required")
    private String password;

    @NotBlank(message = "Email required")
    @Email(message = "Invalid email address")
    private String email;

    private boolean mfaEnabled;
}
