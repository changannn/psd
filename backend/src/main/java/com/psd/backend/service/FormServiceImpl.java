package com.psd.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.psd.backend.model.Form;
import com.psd.backend.respository.FormRepository;

@Service
public class FormServiceImpl implements FormService {

    @Autowired
    FormRepository formRepository;

    @Override
    public Form saveForm(Form form) {
        return formRepository.save(form);
    }
    
}
