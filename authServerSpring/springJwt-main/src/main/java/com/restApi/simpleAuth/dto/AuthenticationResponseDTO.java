package com.restApi.simpleAuth.dto;

public class AuthenticationResponseDTO {
    private String token;
    private String message;

    private Object user;

    public AuthenticationResponseDTO(String token,Object user, String message) {
        this.token = token;
        this.message = message;
        this.user = user;
    }

    public Object getUser() {
        return user;
    }

    public String getToken() {
        return token;
    }

    public String getMessage() {
        return message;
    }
}
