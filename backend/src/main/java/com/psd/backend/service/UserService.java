package com.psd.backend.service;

import java.util.List;

import com.psd.backend.model.Confirmation;
import com.psd.backend.model.UpdateRequest;

import com.psd.backend.model.User;

public interface UserService {
    
    public User createUser(User user);

    public List<User> getUsers();

    public User getUserById(int id);

    public void deleteUser(int id);

    public User updateUser(UpdateRequest request, int id);

    public User findByUsername(String username);

    public void save(User user);

    public List<User> getAccountUsers(User user);

    public Boolean verifyToken(String token);

    public String getEmailByToken(String token);

    public void saveConfirmation(Confirmation confirmation);
}
