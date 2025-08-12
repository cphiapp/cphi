package com.example.common.security;

import com.example.common.db.DatabaseUserReader;
import com.example.common.exception.EntityNotFoundException;
import com.example.user.dao.User;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.http.HttpRequest;
import io.micronaut.security.authentication.AuthenticationProvider;
import io.micronaut.security.authentication.AuthenticationRequest;
import io.micronaut.security.authentication.AuthenticationResponse;
import jakarta.inject.Singleton;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink.OverflowStrategy;

@Singleton
public class BasicAuthProvider implements AuthenticationProvider<HttpRequest<?>> {

    private final DatabaseUserReader databaseuserReader;
    private final PasswordEncoder passwordEncoder;

    public BasicAuthProvider(DatabaseUserReader databaseuserReader,
            PasswordEncoder passwordEncoder) {
        this.databaseuserReader = databaseuserReader;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Publisher<AuthenticationResponse> authenticate(@Nullable HttpRequest<?> httpRequest,
            AuthenticationRequest<?, ?> authenticationRequest) {
        return Flux.create(emitter -> {
            User user;
            try {
                user = databaseuserReader.getUserByUserName(authenticationRequest.getIdentity().toString());
            } catch (EntityNotFoundException exception) {
                emitter.error(AuthenticationResponse.exception());
                return;
            }
            if (passwordEncoder.matches(user.getPassword(), authenticationRequest.getSecret().toString())) {
                emitter.next(AuthenticationResponse.success(user.getUserId()));
                emitter.complete();
            } else {
                emitter.error(AuthenticationResponse.exception());
            }
        }, OverflowStrategy.ERROR);
    }

}