package com.example.common.db;

import com.example.common.exception.EntityNotFoundException;
import com.example.user.dao.User;
import com.example.user.dao.UserRepository;
import jakarta.inject.Singleton;
import java.util.List;

@Singleton
public class DatabaseUserReader {

    private final UserRepository userRepository;

    public DatabaseUserReader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(String userId) {
        return userRepository.findById(userId).orElseThrow(
                () -> new EntityNotFoundException("User userid %s is not found.".formatted(userId)));
    }

    public User getUserByUserName(String userName) {
        return userRepository.findByUserName(userName).orElseThrow(
                () -> new EntityNotFoundException("User name %s is not found.".formatted(userName)));
    }

}