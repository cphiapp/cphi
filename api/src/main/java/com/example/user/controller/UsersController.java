package com.example.user.controller;

import static io.micronaut.http.HttpResponse.ok;
import static io.micronaut.security.rules.SecurityRule.IS_ANONYMOUS;
import static io.micronaut.security.rules.SecurityRule.IS_AUTHENTICATED;

import com.example.user.dao.User;
import com.example.user.dto.request.CreateUserRequest;
import com.example.user.dto.response.UserResponse;
import com.example.user.service.UsersService;
import com.example.user.service.converter.UserToUserResponseConverter;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.security.annotation.Secured;

import java.security.Principal;

@Controller("/users")
@Secured(IS_AUTHENTICATED)
public class UsersController {

    private final UsersService userService;
    private final UserToUserResponseConverter converter;

    public UsersController(UsersService userService,
                          UserToUserResponseConverter converter) {
        this.userService = userService;
        this.converter = converter;
    }

    @Post
    @Secured(IS_ANONYMOUS)
    public HttpResponse<UserResponse> register(@Body CreateUserRequest request) {
        User user = userService.createUser(request);
        return ok(converter.convert(user));
    }

    @Get
    public HttpResponse<UserResponse> login(Principal principal) {
        User user = userService.getCurrentUser(principal.getName());
        return ok(converter.convert(user));
    }
}