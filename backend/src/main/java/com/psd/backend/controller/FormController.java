package com.psd.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.psd.backend.model.Form;
import com.psd.backend.service.FormService;

@RestController
@RequestMapping("/auth")
public class FormController {

    @Autowired
    FormService formService;

    @PostMapping("/test")
    public ResponseEntity<Form> saveForm(@RequestBody Form form){
        Form savedForm = formService.saveForm(form);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedForm);
    }
}
