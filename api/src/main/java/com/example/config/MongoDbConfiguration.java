package com.example.config;

import io.micronaut.context.annotation.ConfigurationProperties;
import io.micronaut.context.annotation.Value;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@ConfigurationProperties("mongodb")
public class MongoDbConfiguration {

    private static final Logger LOG = LoggerFactory.getLogger(MongoDbConfiguration.class);

    @Value("${DATABASE_URL}")
    private String databaseUrl;
    
    @Value("${DB_USERNAME}")
    private String username;
    
    @Value("${DB_PASSWORD}")
    private String password;
    
    private String uri;

    @PostConstruct
    public void buildUri() {
        try {
            // URL encode the username and password to handle special characters
            String encodedUsername = URLEncoder.encode(username, StandardCharsets.UTF_8.toString());
            String encodedPassword = URLEncoder.encode(password, StandardCharsets.UTF_8.toString());
            
            // Build the MongoDB URI with encoded credentials
            uri = String.format("mongodb://%s:%s@%s/appointments?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false",
                    encodedUsername, encodedPassword, databaseUrl);
            
            // Log sanitized URI (without password)
            String sanitizedUri = uri.replaceAll("://[^:]+:[^@]+@", "://***:***@");
            LOG.info("Built MongoDB URI (sanitized): {}", sanitizedUri);
            
        } catch (UnsupportedEncodingException e) {
            LOG.error("Failed to URL encode MongoDB credentials", e);
            throw new RuntimeException("Failed to configure MongoDB URI", e);
        }
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }
}