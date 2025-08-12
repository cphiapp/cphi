package com.example.user.service.converter;

import com.example.common.security.PasswordEncoder;
import com.example.common.security.Roles;
import com.example.common.util.IdGeneratorService;
import com.example.user.dao.User;
import com.example.user.controller.dto.request.CreateUserRequest;
import jakarta.inject.Singleton;

@Singleton
public class CreateUserRequestToUserConverter {

    private final IdGeneratorService idGeneratorService;
    private final PasswordEncoder passwordEncoder;

    public CreateUserRequestToUserConverter(IdGeneratorService idGeneratorService,
                                            PasswordEncoder passwordEncoder) {
        this.idGeneratorService = idGeneratorService;
        this.passwordEncoder = passwordEncoder;
    }

    public User convert(CreateUserRequest request) {
        var user = new User();
        user.setUserId(idGeneratorService.generateId());
        user.setUserName(request.userName());
        user.setDisplayName(request.displayName());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRoleName(Roles.USER.toString());
        return user;
    }
}
