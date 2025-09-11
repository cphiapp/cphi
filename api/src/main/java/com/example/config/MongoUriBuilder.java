package com.example.config;

import io.micronaut.context.annotation.Value;
import io.micronaut.context.event.ApplicationEventListener;
import io.micronaut.runtime.server.event.ServerStartupEvent;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class MongoUriBuilder implements ApplicationEventListener<ServerStartupEvent> {

    private static final Logger LOG = LoggerFactory.getLogger(MongoUriBuilder.class);

    @Value("${DATABASE_URL}")
    private String databaseUrl;
    
    @Value("${DB_USERNAME:}")
    private String username;
    
    @Value("${DB_PASSWORD:}")
    private String password;

    @Override
    public void onApplicationEvent(ServerStartupEvent event) {
        LOG.info("=== MONGODB URI BUILDER ===");
        LOG.info("DATABASE_URL: {}", databaseUrl);
        LOG.info("Username: {}", username != null && !username.isEmpty() ? "***" : "not set");
        LOG.info("Password: {}", password != null && !password.isEmpty() ? "***" : "not set");
        
        String mongoUri;
        
        if (username != null && !username.isEmpty() && password != null && !password.isEmpty()) {
            // Production DocumentDB connection
            mongoUri = String.format("mongodb://%s:%s@%s/appointments?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false",
                    username, password, databaseUrl);
            LOG.info("Built DocumentDB connection URI with credentials");
        } else {
            // Local development connection
            mongoUri = "mongodb://localhost:27017/appointments";
            LOG.info("Built local MongoDB connection URI");
        }
        
        // Log sanitized URI (without password)
        String sanitizedUri = mongoUri.replaceAll("://[^:]+:[^@]+@", "://***:***@");
        LOG.info("MongoDB URI (sanitized): {}", sanitizedUri);
        
        // Set the system property so Micronaut can use it
        System.setProperty("MONGODB_URI", mongoUri);
        
        LOG.info("=== END MONGODB URI BUILDER ===");
    }
}