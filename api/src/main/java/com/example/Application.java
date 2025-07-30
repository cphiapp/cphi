package com.example;

import io.micronaut.runtime.Micronaut;
import java.sql.SQLException;
import org.h2.tools.Server;


public class Application {

    public static void main(String[] args) throws SQLException {
        Server.createWebServer().start();
        Micronaut.run(Application.class, args);
    }
}

//Demo
//Legyen demózható lokál H2 lokál userrel
//Github workflow (build, upload error)
//Logolás
//Tesztek
//Disable security commitnál
//User kezelés basic hogy legyen demózható, AWS majd 2. kör lesz