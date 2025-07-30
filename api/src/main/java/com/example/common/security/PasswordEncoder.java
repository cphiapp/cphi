package com.example.common.security;

import jakarta.inject.Singleton;
import org.apache.commons.codec.digest.DigestUtils;

@Singleton
public class PasswordEncoder {

    public String encode(String password) {
        return DigestUtils.sha256Hex(password);
    }

    public boolean matches(String hash, String password) {
        return encode(password).equals(hash);
    }

}