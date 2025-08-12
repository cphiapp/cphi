package com.example.user.service.converter;

import com.example.user.controller.dto.response.UserResponse;
import com.example.user.dao.User;
import jakarta.inject.Singleton;

@Singleton
public class UserToUserResponseConverter {

    public UserResponse convert(User user) {
        return new UserResponse(user.getUserId(), user.getUserName(), user.getDisplayName(), user.getRoleName());
    }

}