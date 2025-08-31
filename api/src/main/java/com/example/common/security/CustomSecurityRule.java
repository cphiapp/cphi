package com.example.common.security;

import static com.example.common.security.Roles.ROLE_ADMIN;
import static io.micronaut.http.HttpAttributes.ROUTE_MATCH;
import static io.micronaut.security.rules.SecurityRuleResult.ALLOWED;
import static io.micronaut.security.rules.SecurityRuleResult.REJECTED;

import com.example.common.db.DatabaseAppointmentReader;
import com.example.common.exception.EntityNotFoundException;
import io.micronaut.http.HttpRequest;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.rules.SecurityRule;
import io.micronaut.security.rules.SecurityRuleResult;
import io.micronaut.web.router.UriRouteMatch;
import jakarta.annotation.Nullable;
import jakarta.inject.Singleton;
import java.util.Optional;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Mono;

@Singleton
public class CustomSecurityRule implements SecurityRule<HttpRequest<?>> {

    private final DatabaseAppointmentReader databaseAppointmentReader;

    public CustomSecurityRule(DatabaseAppointmentReader databaseAppointmentReader) {
        this.databaseAppointmentReader = databaseAppointmentReader;
    }

    @Override
    public Publisher<SecurityRuleResult> check(HttpRequest<?> request, @Nullable Authentication authentication) {
        if (authentication == null) {
            return Mono.just(REJECTED);
        }

        if (authentication.getRoles().contains(ROLE_ADMIN)) {
            return Mono.just(ALLOWED);
        }

        Optional<UriRouteMatch> uriRouteMatch = request
                .getAttributes()
                .get(ROUTE_MATCH.toString(), UriRouteMatch.class);

        if (uriRouteMatch.isPresent()) {
            var variableValues = uriRouteMatch.get().getVariableValues();
            var appointmentId = variableValues.get("appointmentId").toString();
            try {
                return databaseAppointmentReader.getAppointmentById(appointmentId).userId().equals(appointmentId) ? Mono.just(ALLOWED)
                        : Mono.just(REJECTED);
            } catch (EntityNotFoundException e) {
                return Mono.just(REJECTED);
            }
        }

        return Mono.just(REJECTED);
    }

    @Override
    public int getOrder() {
        return HIGHEST_PRECEDENCE;
    }
}