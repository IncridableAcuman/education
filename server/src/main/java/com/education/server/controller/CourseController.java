package com.education.server.controller;

import com.education.server.dto.CourseDto;
import com.education.server.entity.UserEntity;
import com.education.server.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;

    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<CourseDto.Response> createCourse(
            @Valid @RequestBody CourseDto.CreateRequest request,
            @AuthenticationPrincipal UserEntity currentUser
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(courseService.createCourse(request, currentUser));
    }

    @GetMapping
    public ResponseEntity<List<CourseDto.Response>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDto.Response> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @GetMapping("/my-courses")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<List<CourseDto.Response>> getMyCourses(
            @AuthenticationPrincipal UserEntity currentUser
    ) {
        return ResponseEntity.ok(courseService.getMyCourses(currentUser));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<CourseDto.Response> updateCourse(
            @PathVariable Long id,
            @Valid @RequestBody CourseDto.UpdateRequest request,
            @AuthenticationPrincipal UserEntity currentUser
    ) {
        return ResponseEntity.ok(courseService.updateCourse(id, request, currentUser));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<String> deleteCourse(
            @PathVariable Long id,
            @AuthenticationPrincipal UserEntity currentUser
    ) {
        courseService.deleteCourse(id, currentUser);
        return ResponseEntity.ok("Kurs muvaffaqiyatli o'chirildi");
    }
}