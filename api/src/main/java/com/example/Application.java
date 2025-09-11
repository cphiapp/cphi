package com.example;

import com.example.config.MongoCredentialsEncoder;
import io.micronaut.runtime.Micronaut;

public class Application {

    public static void main(String[] args) {
        // Trigger static initialization of credentials encoder
        MongoCredentialsEncoder.class.getName();
        
        Micronaut.run(Application.class, args);
    }
}
