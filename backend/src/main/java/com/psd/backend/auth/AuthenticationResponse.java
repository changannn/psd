package com.psd.backend.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.psd.backend.model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class AuthenticationResponse {

    private String token;
    private String secretImageUri;
    private boolean mfaEnabled;
    private Role role;
}
