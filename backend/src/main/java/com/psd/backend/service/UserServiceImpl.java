package com.psd.backend.service;

import java.util.List;

import com.psd.backend.model.Confirmation;
import com.psd.backend.model.UpdateRequest;
import com.psd.backend.respository.ConfirmationRepository;
import com.psd.backend.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.psd.backend.model.User;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;

    private final ConfirmationRepository confirmationRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ConfirmationRepository confirmationRepository) {
        this.userRepository = userRepository;
        this.confirmationRepository = confirmationRepository;
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
    public User updateUser(UpdateRequest request, int id) {
        User currentUser = userRepository.findById(id).get();
        currentUser.setRole(request.getRole());
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

    // Get users created by root account
    @Override
    public List<User> getAccountUsers(User user) {
        return userRepository.findUsersCreatedBy(user);
    }

    @Override
    public Boolean verifyToken(String token) {
        Confirmation confirmation = confirmationRepository.findByToken(token);
        User user = userRepository.findByEmailIgnoreCase(confirmation.getUser().getEmail());

        // Checks if user is null
        if (user == null) {
            return false;
        }

        user.setEnabled(true);
        userRepository.save(user);
        confirmationRepository.delete(confirmation);
        return true;
    }

    @Override
    public String getEmailByToken(String token) {
        Confirmation confirmation = confirmationRepository.findByToken(token);
        return confirmation.getUser().getEmail();
    }

    @Override
    public void saveConfirmation(Confirmation confirmation) {
        confirmationRepository.save(confirmation);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        // User implements UserDetails
        return user;
    }
}
