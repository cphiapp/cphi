plugins {
    id("com.gradleup.shadow") version "8.3.6"
    id("io.micronaut.minimal.application") version "4.5.0"
}

version = "0.1"
group = "com.example"

repositories {
    mavenCentral()
}

dependencies {/*
    annotationProcessor(mn.micronaut.data.document.processor)
    annotationProcessor(mn.micronaut.http.validation)
    annotationProcessor(mn.micronaut.security.annotations)
    annotationProcessor(mn.micronaut.serde.processor)
    annotationProcessor(mn.micronaut.validation.processor)
    implementation(mn.micronaut.data.mongodb)
    implementation(mn.micronaut.management)
    implementation(mn.reactor)
    implementation(mn.micronaut.security.jwt)
    implementation(mn.micronaut.validation)
    runtimeOnly(mn.logback.classic)
    runtimeOnly(mn.micronaut.discovery.client)
    runtimeOnly(mn.micronaut.http.client)
    runtimeOnly(mn.mongo.driver)
    runtimeOnly(mn.snakeyaml)
    runtimeOnly("org.mongodb:mongodb-driver-sync")
    testImplementation(mn.micronaut.http.client)
    testImplementation(mn.assertj.core)
    testImplementation(mn.mockito.core)
    testImplementation(mn.mockito.junit.jupiter)
    testRuntimeOnly("org.junit.platform:junit-platform-launcher:1.12.1")*/
    annotationProcessor("io.micronaut:micronaut-http-validation:4.2.4")
    annotationProcessor("io.micronaut.data:micronaut-data-processor:4.3.1")
    annotationProcessor("io.micronaut.serde:micronaut-serde-processor:2.4.0")
    implementation("commons-codec:commons-codec:1.16.0")
    implementation("io.micrometer:context-propagation:1.0.6")
    implementation("io.micronaut.data:micronaut-data-hibernate-jpa:4.3.1")
    implementation("io.micronaut.reactor:micronaut-reactor:3.1.0")
    implementation("io.micronaut.security:micronaut-security:4.4.0")
    implementation("io.micronaut.serde:micronaut-serde-jackson:2.4.0")
    implementation("io.micronaut.sql:micronaut-hibernate-jpa:5.2.0")
    implementation("io.micronaut.sql:micronaut-jdbc-hikari:5.2.0")
    implementation("io.micronaut.validation:micronaut-validation:4.2.0")
    implementation("jakarta.annotation:jakarta.annotation-api:2.1.1")
    implementation("jakarta.persistence:jakarta.persistence-api:2.2.3")
    implementation("com.h2database:h2:2.2.224")
    runtimeOnly("ch.qos.logback:logback-classic:1.4.13")
    runtimeOnly("com.h2database:h2:2.2.224")
    runtimeOnly("org.yaml:snakeyaml:2.0")
    testImplementation("org.assertj:assertj-core:3.22.0")
    testImplementation("org.mockito:mockito-core:4.5.1");
    testImplementation("org.mockito:mockito-junit-jupiter:4.5.1");
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
