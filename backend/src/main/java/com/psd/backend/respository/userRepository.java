package com.psd.backend.respository;

import com.psd.backend.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepository extends JpaRepository<User, Integer>{
    User findByUsername(String username);
}
