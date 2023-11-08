package com.psd.backend.controller;

import com.psd.backend.model.FrontendResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    // When username already in use
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<FrontendResponse> handleDataViolationExceptions(DataIntegrityViolationException ex) {
        FrontendResponse response = new FrontendResponse("Username already in use.");
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    // When user authentication fails
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handlerBadCredentialsExceptions(BadCredentialsException ex) {
//        FrontendResponse response = new FrontendResponse("Authentication failed. Invalid username or password.");
        String response = "Invalid username or password.";
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
}
