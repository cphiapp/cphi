package com.example.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import io.micronaut.context.annotation.Value;
import io.micronaut.context.event.ApplicationEventListener;
import io.micronaut.runtime.server.event.ServerStartupEvent;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class DatabaseConnectionChecker implements ApplicationEventListener<ServerStartupEvent> {

    private static final Logger LOG = LoggerFactory.getLogger(DatabaseConnectionChecker.class);

    private final MongoClient mongoClient;
    
    @Value("${mongodb.uri:not-configured}")
    private String mongoUri;
    
    @Value("${DATABASE_URL:not-set}")
    private String databaseUrl;
    
    @Value("${username:not-set}")
    private String username;

    public DatabaseConnectionChecker(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    @Override
    public void onApplicationEvent(ServerStartupEvent event) {
        LOG.info("=== DATABASE CONNECTION CHECK ===");
        
        // Log configuration (without password)
        String sanitizedUri = mongoUri.replaceAll("://[^:]+:[^@]+@", "://***:***@");
        LOG.info("MongoDB URI (sanitized): {}", sanitizedUri);
        LOG.info("DATABASE_URL: {}", databaseUrl);
        LOG.info("Username: {}", username);
        
        try {
            // Test database connection
            MongoDatabase database = mongoClient.getDatabase("appointments");
            
            // Try to ping the database
            database.runCommand(new org.bson.Document("ping", 1));
            
            LOG.info("✅ Database connection successful!");
            LOG.info("Connected to database: {}", database.getName());
            
            // List collections to verify access
            var collections = database.listCollectionNames();
            LOG.info("Available collections: {}", collections.into(new java.util.ArrayList<>()));
            
        } catch (Exception e) {
            LOG.error("❌ Database connection failed!", e);
            LOG.error("Error details: {}", e.getMessage());
            
            // Log additional debugging info
            try {
                LOG.info("Attempting to get cluster description...");
                var clusterDescription = mongoClient.getClusterDescription();
                LOG.info("Cluster type: {}", clusterDescription.getType());
                LOG.info("Cluster connection mode: {}", clusterDescription.getConnectionMode());
                LOG.info("Server descriptions: {}", clusterDescription.getServerDescriptions());
            } catch (Exception ex) {
                LOG.error("Could not get cluster info: {}", ex.getMessage());
            }
        }
        
        LOG.info("=== END DATABASE CONNECTION CHECK ===");
    }
}