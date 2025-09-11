package com.example.config;

import io.micronaut.context.event.ApplicationEventListener;
import io.micronaut.runtime.server.event.ServerStartupEvent;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class EnvironmentLogger implements ApplicationEventListener<ServerStartupEvent> {

    private static final Logger LOG = LoggerFactory.getLogger(EnvironmentLogger.class);

    @Override
    public void onApplicationEvent(ServerStartupEvent event) {
        LOG.info("=== ENVIRONMENT VARIABLES ===");
        
        // Log relevant environment variables
        logEnvVar("MONGODB_URI");
        logEnvVar("DATABASE_URL");
        logEnvVar("username");
        logEnvVar("password");
        logEnvVar("MICRONAUT_ENVIRONMENTS");
        logEnvVar("JAVA_OPTS");
        
        LOG.info("=== END ENVIRONMENT VARIABLES ===");
    }
    
    private void logEnvVar(String name) {
        String value = System.getenv(name);
        if (value != null) {
            // Sanitize sensitive values
            if (name.toLowerCase().contains("password") || name.toLowerCase().contains("uri")) {
                LOG.info("{}: {} (length: {})", name, "***HIDDEN***", value.length());
            } else {
                LOG.info("{}: {}", name, value);
            }
        } else {
            LOG.info("{}: NOT SET", name);
        }
    }
}