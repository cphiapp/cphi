package com.example.controller;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@Controller("/health")
public class DatabaseHealthController {

    private static final Logger LOG = LoggerFactory.getLogger(DatabaseHealthController.class);

    private final MongoClient mongoClient;

    public DatabaseHealthController(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    @Get("/database")
    public Map<String, Object> checkDatabase() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            MongoDatabase database = mongoClient.getDatabase("appointments");
            
            // Test connection with ping
            database.runCommand(new org.bson.Document("ping", 1));
            
            result.put("status", "UP");
            result.put("database", "appointments");
            result.put("message", "Database connection successful");
            
            LOG.info("Database health check: SUCCESS");
            
        } catch (Exception e) {
            result.put("status", "DOWN");
            result.put("error", e.getMessage());
            result.put("message", "Database connection failed");
            
            LOG.error("Database health check: FAILED - {}", e.getMessage());
        }
        
        return result;
    }
}