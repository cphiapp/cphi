package com.example.common.security;

//Basic implementation for the AWS user management security rule.
//For development purposes we are using basic auth and keeping this disabled.

//@Singleton
public class CustomSecurityRule { /*implements SecurityRule<HttpRequest<?>> {

    private final DatabaseAppointmentReader databaseAppointmentReader;

    public CustomSecurityRule(DatabaseAppointmentReader databaseAppointmentReader) {
        this.databaseAppointmentReader = databaseAppointmentReader;
    }

    @Override
    public Publisher<SecurityRuleResult> check(@Nullable HttpRequest<?> request, @Nullable Authentication authentication) {
        return Mono.just(REJECTED);
    }

    @Override
    public int getOrder() {
        return HIGHEST_PRECEDENCE;
    }*/

}