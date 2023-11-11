package com.psd.backend.exceptions;

public class AccountNotPermittedException extends RuntimeException {

    public AccountNotPermittedException(String message) {
        super(message);
    }
}
