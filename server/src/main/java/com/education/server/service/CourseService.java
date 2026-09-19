package com.education.server.service;

import com.education.server.dto.CourseDto;
import com.education.server.entity.CourseEntity;
import com.education.server.entity.UserEntity;
import com.education.server.entity.enums.Role;
import com.education.server.exception.CustomBadRequestException;
import com.education.server.exception.CustomNotFoundException;
import com.education.server.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;

    @Transactional
    public CourseDto.Response createCourse(CourseDto.CreateRequest request, UserEntity currentUser) {
        if (currentUser.getRole() != Role.TEACHER) {
            throw new CustomBadRequestException("Faqat o'qituvchilar kurs yarata oladi");
        }

        CourseEntity course = CourseEntity.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .teacher(currentUser)
                .build();

        courseRepository.save(course);
        return CourseDto.Response.from(course);
    }

    @Transactional(readOnly = true)
    public List<CourseDto.Response> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(CourseDto.Response::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public CourseDto.Response getCourseById(Long id) {
        CourseEntity course = courseRepository.findById(id)
                .orElseThrow(() -> new CustomNotFoundException("Kurs topilmadi: " + id));
        return CourseDto.Response.from(course);
    }

    @Transactional(readOnly = true)
    public List<CourseDto.Response> getMyCourses(UserEntity currentUser) {
        return courseRepository.findAllByTeacherId(currentUser.getId()).stream()
                .map(CourseDto.Response::from)
                .toList();
    }

    @Transactional
    public CourseDto.Response updateCourse(Long id, CourseDto.UpdateRequest request, UserEntity currentUser) {
        CourseEntity course = courseRepository.findById(id)
                .orElseThrow(() -> new CustomNotFoundException("Kurs topilmadi: " + id));

        if (!course.getTeacher().getId().equals(currentUser.getId())) {
            throw new CustomBadRequestException("Siz faqat o'zingiz yaratgan kursni tahrirlashingiz mumkin");
        }

        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());

        return CourseDto.Response.from(courseRepository.save(course));
    }

    @Transactional
    public void deleteCourse(Long id, UserEntity currentUser) {
        CourseEntity course = courseRepository.findById(id)
                .orElseThrow(() -> new CustomNotFoundException("Kurs topilmadi: " + id));

        if (!course.getTeacher().getId().equals(currentUser.getId())) {
            throw new CustomBadRequestException("Siz faqat o'zingiz yaratgan kursni o'chira olasiz");
        }

        courseRepository.delete(course);
    }
}