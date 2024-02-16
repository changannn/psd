package com.psd.backend.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.psd.backend.model.Form;

@Repository
public interface FormRepository extends JpaRepository<Form, Integer> {

}
