package com.example.user.controller.dto.request;

import com.example.user.controller.dto.annotation.UniqueUserName;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;

@Serdeable
public record CreateUserRequest(@UniqueUserName String userName,
                                @NotBlank String displayName,
                                @NotBlank String password) {

}