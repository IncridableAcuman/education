package com.education.server.dto;

public record EmailPayload(
        String to,
        String subject,
        String text
) {
}
