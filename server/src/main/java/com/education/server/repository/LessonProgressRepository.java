package com.education.server.repository;

import com.education.server.entity.LessonProgressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonProgressRepository extends JpaRepository<LessonProgressEntity, Long> {
    Optional<LessonProgressEntity> findByStudentIdAndLessonId(Long studentId, Long lessonId);

    List<LessonProgressEntity> findAllByStudentIdAndLessonCourseIdAndCompletedTrue(Long studentId, Long courseId);
}