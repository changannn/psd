package com.psd.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.psd.backend.model.Form;
import com.psd.backend.service.FormService;

@RestController
public class FormController {

    @Autowired
    FormService formService;

    @PostMapping("/test")
    public Form saveForm(@RequestBody Form form){
        return formService.saveForm(form);
    }
}
