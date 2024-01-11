package com.psd.backend.service;

import java.util.List;

import com.psd.backend.model.Confirmation;
import org.springframework.stereotype.Service;

import com.psd.backend.model.User;

public interface UserService {
    
    public User createUser(User user);

    public List<User> getUsers();

    public User getUserById(int id);

    public void deleteUser(int id);

    public User updateUser(User user, int id);

    public User findByUsername(String username);

    public void save(User user);

    public List<User> getAccountUsers(User user);

    public Boolean verifyToken(String token);

    public void saveConfirmation(Confirmation confirmation);
}
