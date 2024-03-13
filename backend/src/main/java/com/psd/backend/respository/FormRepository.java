package com.psd.backend.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.psd.backend.model.Form;

@Repository
public interface FormRepository extends JpaRepository<Form, Integer> {

    @Query("SELECT f FROM Form f WHERE f.username = :username")
    List<Form> getFormByUsername(@Param("username") String username);

}
