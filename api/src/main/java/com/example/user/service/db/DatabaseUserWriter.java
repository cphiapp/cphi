package com.example.user.service.db;

import com.example.user.dao.User;
import com.example.user.dao.UserRepository;
import jakarta.inject.Singleton;

@Singleton
public class DatabaseUserWriter {

    private final UserRepository userRepository;

    public DatabaseUserWriter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
}