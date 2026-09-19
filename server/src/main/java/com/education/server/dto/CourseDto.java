package com.education.server.dto;

import com.education.server.entity.CourseEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

public class CourseDto {

    @Data
    public static class CreateRequest {
        @NotBlank(message = "Kurs nomini kiriting")
        @Size(min = 3, max = 150, message = "Kurs nomi 3 tadan 150 tagacha simvoldan iborat bo'lishi kerak")
        private String title;

        @NotBlank(message = "Kurs tavsifini kiriting")
        private String description;
    }

    @Data
    public static class UpdateRequest {
        @NotBlank(message = "Kurs nomini kiriting")
        @Size(min = 3, max = 150, message = "Kurs nomi 3 tadan 150 tagacha simvoldan iborat bo'lishi kerak")
        private String title;

        @NotBlank(message = "Kurs tavsifini kiriting")
        private String description;
    }

    public record TeacherResponse(
            Long id,
            String fullName,
            String email,
            String specialty
    ) {}

    public record Response(
            Long id,
            String title,
            String description,
            TeacherResponse teacher,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {
        public static Response from(CourseEntity course) {
            TeacherResponse teacherDto = new TeacherResponse(
                    course.getTeacher().getId(),
                    course.getTeacher().getFullName(),
                    course.getTeacher().getEmail(),
                    course.getTeacher().getSpecialty()
            );

            return new Response(
                    course.getId(),
                    course.getTitle(),
                    course.getDescription(),
                    teacherDto,
                    course.getCreatedAt(),
                    course.getUpdatedAt()
            );
        }
    }
}