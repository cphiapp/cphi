# Multi-stage Dockerfile for Java Backend + Angular Frontend
# Optimized for ECS Fargate with DocumentDB (ARM64/Graviton)

# Stage 1: Build Angular Frontend
FROM --platform=linux/arm64 node:18-alpine AS frontend-build
WORKDIR /app/client

# Copy package files and install dependencies
COPY client/package*.json ./
RUN npm ci --only=production

# Copy source code and build
COPY client/ ./
RUN npm run build

# Stage 2: Build Java Backend
FROM --platform=linux/arm64 eclipse-temurin:17-jdk-jammy AS backend-build
WORKDIR /app/api

# Copy Gradle wrapper and build files
COPY api/gradle/ gradle/
COPY api/gradlew api/gradlew.bat api/build.gradle.kts api/settings.gradle.kts api/gradle.properties ./

# Make gradlew executable
RUN chmod +x gradlew

# Download dependencies (for better caching)
RUN ./gradlew dependencies --no-daemon

# Copy source code and build
COPY api/src/ src/
RUN ./gradlew shadowJar --no-daemon

# Stage 3: Runtime Image
FROM --platform=linux/arm64 eclipse-temurin:17-jre-jammy AS runtime

# Install nginx for serving static files
RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy built JAR from backend build stage
COPY --from=backend-build /app/api/build/libs/*-all.jar app.jar

# Copy built Angular app from frontend build stage
COPY --from=frontend-build /app/client/dist/ /var/www/html/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create nginx directories (Ubuntu structure)
RUN mkdir -p /var/log/nginx /var/cache/nginx

# Create startup script with proper process management
RUN echo '#!/bin/bash\n\
set -e\n\
\n\
# Function to handle shutdown\n\
shutdown() {\n\
    echo "Shutting down..."\n\
    kill $JAVA_PID 2>/dev/null || true\n\
    nginx -s quit 2>/dev/null || true\n\
    exit 0\n\
}\n\
\n\
# Set up signal handlers\n\
trap shutdown TERM INT\n\
\n\
# Start nginx in background\n\
nginx &\n\
\n\
# Start Java application in background\n\
java -jar /app/app.jar &\n\
JAVA_PID=$!\n\
\n\
# Wait for Java process\n\
wait $JAVA_PID' > /app/start.sh && \
    chmod +x /app/start.sh

# Expose ports
EXPOSE 8080 80

# Install curl for health checks
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Set default environment for production
ENV MICRONAUT_ENVIRONMENTS=production

# Start the application
CMD ["/app/start.sh"]