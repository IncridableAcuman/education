package com.education.server.controller;

import com.education.server.dto.LessonDto;
import com.education.server.entity.UserEntity;
import com.education.server.service.LessonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lessons")
@RequiredArgsConstructor
public class LessonController {
    private final LessonService lessonService;

    @PostMapping("/course/{courseId}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<LessonDto.Response> createLesson(
            @PathVariable Long courseId,
            @Valid @RequestBody LessonDto.CreateRequest request,
            @AuthenticationPrincipal UserEntity currentUser
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(lessonService.createLesson(courseId, request, currentUser));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<LessonDto.Response>> getCourseLessons(@PathVariable Long courseId) {
        return ResponseEntity.ok(lessonService.getCourseLessons(courseId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LessonDto.Response> getLessonById(@PathVariable Long id) {
        return ResponseEntity.ok(lessonService.getLessonById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<LessonDto.Response> updateLesson(
            @PathVariable Long id,
            @Valid @RequestBody LessonDto.UpdateRequest request,
            @AuthenticationPrincipal UserEntity currentUser
    ) {
        return ResponseEntity.ok(lessonService.updateLesson(id, request, currentUser));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<String> deleteLesson(
            @PathVariable Long id,
            @AuthenticationPrincipal UserEntity currentUser
    ) {
        lessonService.deleteLesson(id, currentUser);
        return ResponseEntity.ok("Dars muvaffaqiyatli o'chirildi");
    }
}