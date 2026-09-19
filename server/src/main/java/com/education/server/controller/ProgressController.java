package com.education.server.controller;

import com.education.server.dto.ProgressDto;
import com.education.server.entity.UserEntity;
import com.education.server.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/progress")
@RequiredArgsConstructor
public class ProgressController {
    private final ProgressService progressService;

    @PostMapping("/lessons/{lessonId}/toggle")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ProgressDto.LessonProgressResponse> toggleLessonCompletion(
            @PathVariable Long lessonId,
            @AuthenticationPrincipal UserEntity student
    ) {
        return ResponseEntity.ok(progressService.toggleLessonCompletion(lessonId, student));
    }

    @GetMapping("/courses/{courseId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ProgressDto.CourseProgressResponse> getCourseProgress(
            @PathVariable Long courseId,
            @AuthenticationPrincipal UserEntity student
    ) {
        return ResponseEntity.ok(progressService.getCourseProgress(courseId, student));
    }
}