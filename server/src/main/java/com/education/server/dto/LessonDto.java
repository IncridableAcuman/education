package com.education.server.dto;

import com.education.server.entity.LessonEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

public class LessonDto {

    @Data
    public static class CreateRequest {
        @NotBlank(message = "Dars sarlavhasini kiriting")
        @Size(min = 3, max = 150, message = "Sarlavha 3 tadan 150 tagacha simvoldan iborat bo'lishi kerak")
        private String title;

        @NotBlank(message = "Dars mazmunini kiriting")
        private String content;

        private String videoUrl;

        @NotNull(message = "Dars tartib raqamini kiriting")
        private Integer orderNumber;
    }

    @Data
    public static class UpdateRequest {
        @NotBlank(message = "Dars sarlavhasini kiriting")
        @Size(min = 3, max = 150, message = "Sarlavha 3 tadan 150 tagacha simvoldan iborat bo'lishi kerak")
        private String title;

        @NotBlank(message = "Dars mazmunini kiriting")
        private String content;

        private String videoUrl;

        @NotNull(message = "Dars tartib raqamini kiriting")
        private Integer orderNumber;
    }

    public record Response(
            Long id,
            String title,
            String content,
            String videoUrl,
            Integer orderNumber,
            Long courseId,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {
        public static Response from(LessonEntity lesson) {
            return new Response(
                    lesson.getId(),
                    lesson.getTitle(),
                    lesson.getContent(),
                    lesson.getVideoUrl(),
                    lesson.getOrderNumber(),
                    lesson.getCourse().getId(),
                    lesson.getCreatedAt(),
                    lesson.getUpdatedAt()
            );
        }
    }
}