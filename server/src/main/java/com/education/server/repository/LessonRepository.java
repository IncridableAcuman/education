package com.education.server.repository;

import com.education.server.entity.LessonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<LessonEntity, Long> {
    List<LessonEntity> findAllByCourseIdOrderByOrderNumberAsc(Long courseId);
}