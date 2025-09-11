package com.example.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import io.micronaut.context.annotation.Bean;
import io.micronaut.context.annotation.Factory;
import io.micronaut.context.annotation.Replaces;
import io.micronaut.context.annotation.Value;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Factory
public class MongoClientFactory {

    private static final Logger LOG = LoggerFactory.getLogger(MongoClientFactory.class);

    @Value("${DATABASE_URL:localhost:27017}")
    private String databaseUrl;
    
    @Value("${username:}")
    private String username;
    
    @Value("${password:}")
    private String password;

    @Bean
    @Singleton
    @Replaces(MongoClient.class)
    public MongoClient mongoClient() {
        String uri;
        
        if (username != null && !username.isEmpty() && password != null && !password.isEmpty()) {
            // Production DocumentDB connection
            uri = String.format("mongodb://%s:%s@%s/appointments?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false",
                    username, password, databaseUrl);
            LOG.info("Creating DocumentDB connection with credentials");
        } else {
            // Local development connection
            uri = "mongodb://localhost:27017/appointments";
            LOG.info("Creating local MongoDB connection");
        }
        
        // Log sanitized URI (without password)
        String sanitizedUri = uri.replaceAll("://[^:]+:[^@]+@", "://***:***@");
        LOG.info("MongoDB URI (sanitized): {}", sanitizedUri);
        
        try {
            ConnectionString connectionString = new ConnectionString(uri);
            MongoClientSettings settings = MongoClientSettings.builder()
                    .applyConnectionString(connectionString)
                    .build();
            
            MongoClient client = MongoClients.create(settings);
            LOG.info("MongoDB client created successfully");
            return client;
            
        } catch (Exception e) {
            LOG.error("Failed to create MongoDB client: {}", e.getMessage());
            throw e;
        }
    }
}