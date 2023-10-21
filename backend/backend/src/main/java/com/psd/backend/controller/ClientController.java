package com.psd.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.psd.backend.model.User;
import com.psd.backend.service.UserService;

@Controller
public class ClientController {
    
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String helloworld(){
        return "hello world";
    }

    // Rest API CRUD

    @PostMapping("/add")
    public User createUser(@RequestBody User user){
        User currentUser = userService.createUser(user);
        return currentUser;
    }

    @GetMapping("/users")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @PutMapping("/update/{id}")
    public User updateUserById(@RequestBody User user, @PathVariable("id") int id){
        return userService.updateUser(user, id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") int id){
        userService.deleteUser(id);
        return "User deleted successfully...";
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable("id") int id){
        return userService.getUserById(id);
    }
}
