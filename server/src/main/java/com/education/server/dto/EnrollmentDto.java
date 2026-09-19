package com.education.server.dto;

import com.education.server.entity.EnrollmentEntity;

import java.time.LocalDateTime;

public class EnrollmentDto {

    public record Response(
            Long id,
            Long courseId,
            String courseTitle,
            Long studentId,
            String studentName,
            LocalDateTime enrolledAt
    ) {
        public static Response from(EnrollmentEntity enrollment) {
            return new Response(
                    enrollment.getId(),
                    enrollment.getCourse().getId(),
                    enrollment.getCourse().getTitle(),
                    enrollment.getStudent().getId(),
                    enrollment.getStudent().getFullName(),
                    enrollment.getEnrolledAt()
            );
        }
    }
}