package com.psd.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.psd.backend.model.User;
import com.psd.backend.respository.userRespository;;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private userRespository userRespository;

    @Override
    public User createUser(User user) {
        return userRespository.save(user);
    }

    @Override
    public void deleteUser(int id) {
        userRespository.deleteById(id);
    }

    @Override
    public User getUserById(int id) {
        return userRespository.findById(id).get();
    }

    @Override
    public List<User> getUsers() {
        return (List<User>) userRespository.findAll();
    }

    @Override
    public User updateUser(User user, int id) {
        User currentUser = userRespository.findById(id).get();
        currentUser.setEmail(user.getEmail());
        currentUser.setPassword(user.getPassword());
        return userRespository.save(currentUser);
    }
    
    
    
    
}
