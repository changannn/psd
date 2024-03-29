package com.psd.backend.respository;

import com.psd.backend.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    User findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.createdBy = :user")
    List<User> findUsersCreatedBy(@Param("user") User user);

    User findByEmailIgnoreCase(String email);

    Boolean existsByEmail(String email);
}
