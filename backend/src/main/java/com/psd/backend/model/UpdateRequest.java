package com.psd.backend.model;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRequest {

    @NotBlank(message = "Email required")
    private String email;
    @NotBlank(message = "Role required")
    private Role role;
}
