package com.education.server.controller;

import com.education.server.dto.EnrollmentDto;
import com.education.server.entity.UserEntity;
import com.education.server.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    @PostMapping("/course/{courseId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<EnrollmentDto.Response> enroll(
            @PathVariable Long courseId,
            @AuthenticationPrincipal UserEntity student
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(enrollmentService.enroll(courseId, student));
    }

    @DeleteMapping("/course/{courseId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<String> unenroll(
            @PathVariable Long courseId,
            @AuthenticationPrincipal UserEntity student
    ) {
        enrollmentService.unenroll(courseId, student);
        return ResponseEntity.ok("Kurs a'zoligi bekor qilindi");
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<EnrollmentDto.Response>> getMyEnrolledCourses(
            @AuthenticationPrincipal UserEntity student
    ) {
        return ResponseEntity.ok(enrollmentService.getMyEnrolledCourses(student));
    }

    @GetMapping("/check/{courseId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Boolean> isEnrolled(
            @PathVariable Long courseId,
            @AuthenticationPrincipal UserEntity student
    ) {
        return ResponseEntity.ok(enrollmentService.isEnrolled(courseId, student));
    }
}