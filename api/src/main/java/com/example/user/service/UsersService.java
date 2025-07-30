package com.example.user.service;

import com.example.common.db.DatabaseUserReader;
import com.example.user.dao.User;
import com.example.user.dto.request.CreateUserRequest;
import com.example.user.service.converter.CreateUserRequestToUserConverter;
import com.example.user.service.db.DatabaseUserWriter;
import jakarta.inject.Singleton;

@Singleton
public class UsersService {

    private final CreateUserRequestToUserConverter converter;
    private final DatabaseUserReader databaseUserReader;
    private final DatabaseUserWriter databaseUserWriter;


    public UsersService(CreateUserRequestToUserConverter converter,
                        DatabaseUserReader databaseUserReader,
                        DatabaseUserWriter databaseUserWriter) {
        this.converter = converter;
        this.databaseUserReader = databaseUserReader;
        this.databaseUserWriter = databaseUserWriter;
    }

    public User getCurrentUser(String userId) {
        return databaseUserReader.getUserById(userId);
    }

    public User createUser(CreateUserRequest request) {
        var user = converter.convert(request);
        return databaseUserWriter.createUser(user);
    }

}