package com.jpbarreiro.trabalho2devweb.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@AllArgsConstructor

public class ErrorResponse {
    private LocalDateTime localDateTime;
    private int errorCode;
    private String error;
    private String metodo;
    private String requestUri;
    private Map<String, String> map;
    private String message;
}
