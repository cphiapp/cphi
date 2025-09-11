# Backend-only Dockerfile for Java API
# Optimized for ECS Fargate with DocumentDB (ARM64/Graviton)

# Stage 1: Build Java Backend
FROM --platform=linux/arm64 public.ecr.aws/docker/library/eclipse-temurin:11 AS backend-build
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

# Stage 2: Runtime Image
FROM --platform=linux/arm64 eclipse-temurin:17-jre-jammy AS runtime

# Create app directory
WORKDIR /app

# Copy built JAR from backend build stage
COPY --from=backend-build /app/api/build/libs/*-all.jar app.jar

# Install curl for health checks
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Expose API port only
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Set default environment for production
ENV MICRONAUT_ENVIRONMENTS=production

# Start the Java application
CMD ["java", "-jar", "/app/app.jar"]