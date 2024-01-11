package com.psd.backend.controller;

import com.psd.backend.exceptions.AccountNotPermittedException;
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

    // When compulsory fields in register page not filled
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
        FrontendResponse response = new FrontendResponse("Username/Email already in use.");
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    // When user authentication fails
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentialsExceptions(BadCredentialsException ex) {
        String response = ex.getMessage();
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    // When account not allowed to create users
    @ExceptionHandler(AccountNotPermittedException.class)
    public ResponseEntity<String> handleAccountNotPermittedExceptions(AccountNotPermittedException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }
}
