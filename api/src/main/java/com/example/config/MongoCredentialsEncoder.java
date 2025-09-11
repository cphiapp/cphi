package com.example.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class MongoCredentialsEncoder {

    private static final Logger LOG = LoggerFactory.getLogger(MongoCredentialsEncoder.class);

    static {
        encodeCredentials();
    }

    private static void encodeCredentials() {
        try {
            String username = System.getenv("DB_USERNAME");
            String password = System.getenv("DB_PASSWORD");
            String databaseUrl = System.getenv("DATABASE_URL");
            
            if (username != null && password != null && databaseUrl != null) {
                LOG.info("=== ENCODING MONGODB CREDENTIALS ===");
                LOG.info("Raw username length: {}", username.length());
                LOG.info("Raw password length: {}", password.length());
                
                // URL encode the credentials
                String encodedUsername = URLEncoder.encode(username, StandardCharsets.UTF_8);
                String encodedPassword = URLEncoder.encode(password, StandardCharsets.UTF_8);
                
                // Set encoded values as system properties
                System.setProperty("ENCODED_DB_USERNAME", encodedUsername);
                System.setProperty("ENCODED_DB_PASSWORD", encodedPassword);
                
                LOG.info("Set encoded credentials as system properties");
                LOG.info("=== END ENCODING MONGODB CREDENTIALS ===");
            } else {
                LOG.warn("Missing MongoDB environment variables - skipping credential encoding");
            }
        } catch (Exception e) {
            LOG.error("Failed to encode MongoDB credentials", e);
        }
    }
}