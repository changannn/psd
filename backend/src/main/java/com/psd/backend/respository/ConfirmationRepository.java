package com.psd.backend.respository;

import com.psd.backend.model.Confirmation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmationRepository extends JpaRepository<Confirmation, Integer> {

    Confirmation findByToken(String token);
}
