package com.example.config;

import com.example.appointment.dao.AppointmentRepository;
import io.micronaut.context.annotation.Value;
import io.micronaut.context.event.ApplicationEventListener;
import io.micronaut.runtime.server.event.ServerStartupEvent;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class DatabaseConnectionChecker implements ApplicationEventListener<ServerStartupEvent> {

    private static final Logger LOG = LoggerFactory.getLogger(DatabaseConnectionChecker.class);

    private final AppointmentRepository appointmentRepository;
    
    @Value("${mongodb.uri:not-configured}")
    private String mongoUri;
    
    @Value("${DATABASE_URL}")
    private String databaseUrl;
    
    @Value("${DB_USERNAME:not-set}")
    private String username;

    public DatabaseConnectionChecker(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public void onApplicationEvent(ServerStartupEvent event) {
        LOG.info("=== DATABASE CONNECTION CHECK ===");
        
        // Log all environment variables for debugging
        LOG.info("All environment variables:");
        System.getenv().forEach((key, value) -> {
            if (key.toLowerCase().contains("password") || key.toLowerCase().contains("secret")) {
                LOG.info("  {}: ***", key);
            } else {
                LOG.info("  {}: {}", key, value);
            }
        });
        
        // Log configuration (without password)
        String sanitizedUri = mongoUri.replaceAll("://[^:]+:[^@]+@", "://***:***@");
        LOG.info("MongoDB URI from config (sanitized): {}", sanitizedUri);
        LOG.info("DATABASE_URL: {}", databaseUrl);
        LOG.info("Username: {}", username != null && !username.isEmpty() ? "***" : "not set");
        
        // Check system property
        String systemMongoUri = System.getProperty("MONGODB_URI");
        if (systemMongoUri != null) {
            String sanitizedSystemUri = systemMongoUri.replaceAll("://[^:]+:[^@]+@", "://***:***@");
            LOG.info("MongoDB URI from system property (sanitized): {}", sanitizedSystemUri);
        } else {
            LOG.info("No MONGODB_URI system property set");
        }
        
        try {
            // Test database connection by trying to count appointments
            long count = appointmentRepository.count();
            
            LOG.info("✅ Database connection successful!");
            LOG.info("Current appointment count: {}", count);
            
        } catch (Exception e) {
            LOG.error("❌ Database connection failed!", e);
            LOG.error("Error details: {}", e.getMessage());
            LOG.error("Error class: {}", e.getClass().getSimpleName());
            
            // Log the full stack trace for debugging
            LOG.error("Full stack trace:", e);
        }
        
        LOG.info("=== END DATABASE CONNECTION CHECK ===");
    }
}