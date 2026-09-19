package com.education.server.service;

import com.education.server.dto.EnrollmentDto;
import com.education.server.entity.CourseEntity;
import com.education.server.entity.EnrollmentEntity;
import com.education.server.entity.UserEntity;
import com.education.server.entity.enums.Role;
import com.education.server.exception.CustomBadRequestException;
import com.education.server.exception.CustomNotFoundException;
import com.education.server.repository.CourseRepository;
import com.education.server.repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public EnrollmentDto.Response enroll(Long courseId, UserEntity student) {
        if (student.getRole() != Role.STUDENT) {
            throw new CustomBadRequestException("Faqat talabalar kurslarga yozilishi mumkin");
        }

        CourseEntity course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CustomNotFoundException("Kurs topilmadi: " + courseId));

        if (enrollmentRepository.existsByStudentIdAndCourseId(student.getId(), courseId)) {
            throw new CustomBadRequestException("Siz allachachon ushbu kursga yozilgansiz");
        }

        EnrollmentEntity enrollment = EnrollmentEntity.builder()
                .student(student)
                .course(course)
                .build();

        return EnrollmentDto.Response.from(enrollmentRepository.save(enrollment));
    }

    @Transactional
    public void unenroll(Long courseId, UserEntity student) {
        EnrollmentEntity enrollment = enrollmentRepository.findByStudentIdAndCourseId(student.getId(), courseId)
                .orElseThrow(() -> new CustomNotFoundException("A'zolik topilmadi"));

        enrollmentRepository.delete(enrollment);
    }

    @Transactional(readOnly = true)
    public List<EnrollmentDto.Response> getMyEnrolledCourses(UserEntity student) {
        return enrollmentRepository.findAllByStudentId(student.getId()).stream()
                .map(EnrollmentDto.Response::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public boolean isEnrolled(Long courseId, UserEntity student) {
        return enrollmentRepository.existsByStudentIdAndCourseId(student.getId(), courseId);
    }
}