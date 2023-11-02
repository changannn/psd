package com.psd.backend.service;

import java.util.List;

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
}
