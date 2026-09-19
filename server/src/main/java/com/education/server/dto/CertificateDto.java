package com.education.server.dto;

import com.education.server.entity.CertificateEntity;

import java.time.LocalDateTime;

public class CertificateDto {

    public record Response(
            Long id,
            String certificateNumber,
            Long courseId,
            String courseTitle,
            String studentName,
            LocalDateTime issuedAt,
            String downloadUrl
    ) {
        public static Response from(CertificateEntity cert, String baseUrl) {
            return new Response(
                    cert.getId(),
                    cert.getCertificateNumber(),
                    cert.getCourse().getId(),
                    cert.getCourse().getTitle(),
                    cert.getStudent().getFullName(),
                    cert.getIssuedAt(),
                    baseUrl + "/certificates/download/" + cert.getCertificateNumber()
            );
        }
    }
}