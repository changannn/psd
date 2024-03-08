package com.psd.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.psd.backend.model.Form;

@Service
public interface FormService {
    public Form saveForm(Form form);

    public List<Form> getForm(String username);
    
    
}
