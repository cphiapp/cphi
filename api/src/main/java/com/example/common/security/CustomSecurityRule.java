package com.example.common.security;

import static io.micronaut.security.rules.SecurityRuleResult.ALLOWED;

import com.example.common.db.DatabaseAppointmentReader;
import io.micronaut.http.HttpRequest;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.rules.SecurityRule;
import io.micronaut.security.rules.SecurityRuleResult;
import jakarta.annotation.Nullable;
import jakarta.inject.Singleton;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Mono;

@Singleton
public class CustomSecurityRule implements SecurityRule<HttpRequest<?>> {

    private final DatabaseAppointmentReader databaseAppointmentReader;

    public CustomSecurityRule(DatabaseAppointmentReader databaseAppointmentReader) {
        this.databaseAppointmentReader = databaseAppointmentReader;
    }

    @Override
    public Publisher<SecurityRuleResult> check(@Nullable HttpRequest<?> request, @Nullable Authentication authentication) {
        //return authentication == null ? Mono.just(REJECTED) : Mono.just(ALLOWED);
        return Mono.just(ALLOWED);
    }


    @Override
    public int getOrder() {
        return HIGHEST_PRECEDENCE;
    }
}