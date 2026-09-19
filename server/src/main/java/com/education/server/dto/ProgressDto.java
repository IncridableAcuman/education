package com.education.server.dto;

import java.util.List;

public class ProgressDto {

    public record CourseProgressResponse(
            Long courseId,
            String courseTitle,
            int totalLessons,
            int completedLessons,
            double percentage,
            List<Long> completedLessonIds
    ) {}

    public record LessonProgressResponse(
            Long lessonId,
            boolean completed
    ) {}
}