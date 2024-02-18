package com.psd.backend.service;

import org.springframework.stereotype.Service;

import com.psd.backend.model.Form;

@Service
public interface FormService {
    public Form saveForm(Form form);
}
