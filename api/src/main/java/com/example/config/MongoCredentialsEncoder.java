package com.example.config;

import io.micronaut.context.annotation.Bean;
import io.micronaut.context.annotation.Factory;
import io.micronaut.context.annotation.Requires;
import io.micronaut.context.annotation.Value;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Factory
public class MongoCredentialsEncoder {

    private static final Logger LOG = LoggerFactory.getLogger(MongoCredentialsEncoder.class);

    @Bean
    @Singleton
    @Requires(env = {"DB_USERNAME", "DB_PASSWORD"})
    public String encodedDbUsername(@Value("${DB_USERNAME}") String username) {
        LOG.info("Encoding username from DB_USERNAME environment variable.");
        return encode(username);
    }

    @Bean
    @Singleton
    @Requires(env = {"DB_USERNAME", "DB_PASSWORD"})
    public String encodedDbPassword(@Value("${DB_PASSWORD}") String password) {
        LOG.info("Encoding password from DB_PASSWORD environment variable.");
        return encode(password);
    }

    private String encode(String value) {
        if (value == null) {
            return "";
        }
        try {
            return URLEncoder.encode(value, StandardCharsets.UTF_8.toString());
        } catch (Exception e) {
            LOG.error("Failed to URL encode value", e);
            return value;
        }
    }
}