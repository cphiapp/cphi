package com.example.user.service.converter;

import com.example.user.dao.User;
import com.example.user.dto.response.UserResponse;
import jakarta.inject.Singleton;
import java.util.List;

@Singleton
public class UserToUserResponseConverter {

    public UserResponse convert(User user) {
        return new UserResponse(user.getUserId(), user.getUserName(), user.getDisplayName());
    }

}