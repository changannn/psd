package com.psd.backend.model;

public class FrontendResponse {
    private String message;

    public FrontendResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
