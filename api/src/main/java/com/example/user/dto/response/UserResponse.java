package com.example.user.dto.response;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record UserResponse(String userId, String userName, String displayName) {

}