package com.education.server.repository;

import com.education.server.entity.EnrollmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<EnrollmentEntity, Long> {
    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);
    Optional<EnrollmentEntity> findByStudentIdAndCourseId(Long studentId, Long courseId);
    List<EnrollmentEntity> findAllByStudentId(Long studentId);
    List<EnrollmentEntity> findAllByCourseId(Long courseId);
}