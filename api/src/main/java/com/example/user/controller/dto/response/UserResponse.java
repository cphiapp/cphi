package com.example.user.controller.dto.response;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record UserResponse(String userId, String userName, String displayName, String roleName) {

}