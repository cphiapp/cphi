package com.example.config;

import io.micronaut.context.annotation.Bean;
import io.micronaut.context.annotation.Factory;
import io.micronaut.context.annotation.Requires;
import io.micronaut.context.annotation.Value;
import io.micronaut.json.JsonMapper;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Factory
public class MongoCredentialsEncoder {

    private static final Logger LOG = LoggerFactory.getLogger(MongoCredentialsEncoder.class);
    private final JsonMapper jsonMapper;

    public MongoCredentialsEncoder(JsonMapper jsonMapper) {
        this.jsonMapper = jsonMapper;
    }

    // DTO class to hold credentials from JSON
    public static class DbCredentials {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    @Singleton
    @Requires(property = "DB_USERNAME")
    public DbCredentials dbCredentials(@Value("${DB_USERNAME}") String json) {
        try {
            LOG.info("Parsing DB_USERNAME as JSON secret.");
            DbCredentials credentials = jsonMapper.readValue(json, DbCredentials.class);
            if (credentials.getUsername() == null || credentials.getPassword() == null) {
                LOG.error("Parsed credentials JSON is missing 'username' or 'password' field.");
                throw new IllegalStateException("Parsed credentials JSON is missing 'username' or 'password' field.");
            }
            LOG.info("Successfully parsed credentials from JSON.");
            return credentials;
        } catch (IOException e) {
            LOG.error("Failed to parse DB_USERNAME JSON secret", e);
            throw new RuntimeException("Failed to parse DB_USERNAME JSON secret", e);
        }
    }

    @Bean
    @Singleton
    public String encodedDbUsername(DbCredentials credentials) {
        LOG.info("Encoding username from parsed secret.");
        return encode(credentials.getUsername());
    }

    @Bean
    @Singleton
    public String encodedDbPassword(DbCredentials credentials) {
        LOG.info("Encoding password from parsed secret.");
        return encode(credentials.getPassword());
    }

    private String encode(String value) {
        if (value == null) {
            return "";
        }
        try {
            return URLEncoder.encode(value, StandardCharsets.UTF_8);
        } catch (Exception e) {
            LOG.error("Failed to URL encode value", e);
            return value; // Fallback to original value
        }
    }
}