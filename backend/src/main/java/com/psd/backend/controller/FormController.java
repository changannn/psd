package com.psd.backend.controller;


import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.psd.backend.model.Form;
import com.psd.backend.service.FormService;
import com.psd.backend.service.JwtService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;



@RestController
@AllArgsConstructor
public class FormController {

    private final FormService formService;
    private final JwtService jwtService;

    @PostMapping("/iemsim")
    public ResponseEntity<Form> saveForm(@RequestBody Form form){
        Form savedForm = formService.saveForm(form);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedForm);
    }

    @GetMapping("/iemsim")
    public List<Form> getForm(HttpServletRequest request) {
        
        final String jwt;
        final String username;

        // Extract jwt and extract username from the jwt
        jwt = extractJwtFromRequest(request);
        username = jwtService.extractUsername(jwt);

        // Find user form and return
        return formService.getForm(username);

    }
    
    public String extractJwtFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        return authHeader.substring(7);
    }

}
