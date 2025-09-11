plugins {
    id("com.gradleup.shadow") version "8.3.6"
    id("io.micronaut.minimal.application") version "4.5.0"
}

version = "0.1"
group = "com.example"

repositories {
    mavenCentral()
}

dependencies {
    annotationProcessor(mn.micronaut.data.document.processor)
    annotationProcessor(mn.micronaut.http.validation)
    annotationProcessor(mn.micronaut.serde.processor)
    annotationProcessor(mn.micronaut.validation.processor)
    implementation(mn.micronaut.data.mongodb)
    implementation(mn.micronaut.management)
    implementation(mn.reactor)
    implementation(mn.micronaut.validation)
    runtimeOnly(mn.logback.classic)
    runtimeOnly(mn.micronaut.discovery.client)
    runtimeOnly(mn.micronaut.http.client)
    runtimeOnly(mn.mongo.driver)
    runtimeOnly(mn.snakeyaml)
    runtimeOnly("org.mongodb:mongodb-driver-sync:4.11.0")
    testImplementation(mn.micronaut.http.client)
    testImplementation(mn.assertj.core)
    testImplementation(mn.mockito.core)
    testImplementation(mn.mockito.junit.jupiter)
    testRuntimeOnly("org.junit.platform:junit-platform-launcher:1.12.1")
}

application {
    mainClass = "com.example.Application"
}

java {
    sourceCompatibility = JavaVersion.toVersion("17")
    targetCompatibility = JavaVersion.toVersion("17")
}

micronaut {
    runtime("netty")
    testRuntime("junit5")
    processing {
        incremental(true)
        annotations("com.example.*")

    }
}
