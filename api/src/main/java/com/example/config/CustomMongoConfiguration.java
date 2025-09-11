package com.example.config;

import io.micronaut.context.annotation.ConfigurationProperties;
import io.micronaut.context.annotation.Replaces;
import io.micronaut.context.annotation.Value;
import io.micronaut.data.mongodb.conf.DefaultMongoConfiguration;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@ConfigurationProperties("mongodb")
@Replaces(DefaultMongoConfiguration.class)
public class CustomMongoConfiguration extends DefaultMongoConfiguration {

    private static final Logger LOG = LoggerFactory.getLogger(CustomMongoConfiguration.class);
    
    public CustomMongoConfiguration() {
        super();
        LOG.info("CustomMongoConfiguration created - replacing default MongoDB configuration");
    }

    @Value("${DATABASE_URL}")
    private String databaseUrl;
    
    @Value("${DB_USERNAME}")
    private String username;
    
    @Value("${DB_PASSWORD}")
    private String password;

    @PostConstruct
    public void buildUri() {
        try {
            LOG.info("=== CUSTOM MONGODB CONFIGURATION ===");
            LOG.info("DATABASE_URL: {}", databaseUrl);
            LOG.info("Username: {}", username != null && !username.isEmpty() ? "***" : "not set");
            LOG.info("Password: {}", password != null && !password.isEmpty() ? "***" : "not set");
            
            // URL encode the username and password to handle special characters
            String encodedUsername = URLEncoder.encode(username, StandardCharsets.UTF_8);
            String encodedPassword = URLEncoder.encode(password, StandardCharsets.UTF_8);
            
            // Build the MongoDB URI with encoded credentials
            String uri = String.format("mongodb://%s:%s@%s/appointments?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false",
                    encodedUsername, encodedPassword, databaseUrl);
            
            // Set the URI on the parent configuration
            setUri(uri);
            
            // Log sanitized URI (without password)
            String sanitizedUri = uri.replaceAll("://[^:]+:[^@]+@", "://***:***@");
            LOG.info("Set MongoDB URI (sanitized): {}", sanitizedUri);
            LOG.info("=== END CUSTOM MONGODB CONFIGURATION ===");
            
        } catch (Exception e) {
            LOG.error("Failed to configure MongoDB URI", e);
            throw new RuntimeException("Failed to configure MongoDB URI", e);
        }
    }
}