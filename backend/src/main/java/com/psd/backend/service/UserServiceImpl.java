package com.psd.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.psd.backend.model.User;
import com.psd.backend.respository.userRepository;;

@Service
public class UserServiceImpl implements UserService{

    private userRepository userRepository;
    @Autowired
    public UserServiceImpl(userRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public User getUserById(int id) {
        return userRepository.findById(id).get();
    }

    @Override
    public List<User> getUsers() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public User updateUser(User user, int id) {
        User currentUser = userRepository.findById(id).get();
        currentUser.setEmail(user.getEmail());
        currentUser.setPassword(user.getPassword());
        return userRepository.save(currentUser);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }


}
