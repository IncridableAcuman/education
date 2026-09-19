package com.education.server.service;

import com.education.server.dto.ProgressDto;
import com.education.server.entity.CourseEntity;
import com.education.server.entity.LessonEntity;
import com.education.server.entity.LessonProgressEntity;
import com.education.server.entity.UserEntity;
import com.education.server.event.CourseCompletedEvent;
import com.education.server.exception.CustomBadRequestException;
import com.education.server.exception.CustomNotFoundException;
import com.education.server.repository.CourseRepository;
import com.education.server.repository.EnrollmentRepository;
import com.education.server.repository.LessonProgressRepository;
import com.education.server.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgressService {
    private final LessonProgressRepository progressRepository;
    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public ProgressDto.LessonProgressResponse toggleLessonCompletion(Long lessonId, UserEntity student) {
        LessonEntity lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new CustomNotFoundException("Dars topilmadi: " + lessonId));

        Long courseId = lesson.getCourse().getId();

        if (!enrollmentRepository.existsByStudentIdAndCourseId(student.getId(), courseId)) {
            throw new CustomBadRequestException("Darsni ko'rib chiqilgan deb belgilash uchun avval kursga a'zo bo'ling");
        }

        LessonProgressEntity progress = progressRepository.findByStudentIdAndLessonId(student.getId(), lessonId)
                .orElseGet(() -> LessonProgressEntity.builder()
                        .student(student)
                        .lesson(lesson)
                        .completed(false)
                        .build());

        boolean newStatus = !progress.isCompleted();
        progress.setCompleted(newStatus);
        progress.setCompletedAt(newStatus ? LocalDateTime.now() : null);

        progressRepository.save(progress);

        // Agar dars bajargan deb belgilansa va kurs 100% bo'lsa, hodisa tarqatiladi
        if (newStatus) {
            ProgressDto.CourseProgressResponse courseProgress = getCourseProgress(courseId, student);
            if (courseProgress.percentage() == 100.0) {
                eventPublisher.publishEvent(new CourseCompletedEvent(courseId, student));
            }
        }

        return new ProgressDto.LessonProgressResponse(lessonId, newStatus);
    }

    @Transactional(readOnly = true)
    public ProgressDto.CourseProgressResponse getCourseProgress(Long courseId, UserEntity student) {
        CourseEntity course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CustomNotFoundException("Kurs topilmadi: " + courseId));

        if (!enrollmentRepository.existsByStudentIdAndCourseId(student.getId(), courseId)) {
            throw new CustomBadRequestException("Siz ushbu kursga a'zo emassiz");
        }

        List<LessonEntity> lessons = lessonRepository.findAllByCourseIdOrderByOrderNumberAsc(courseId);
        int totalLessons = lessons.size();

        List<LessonProgressEntity> completedProgresses =
                progressRepository.findAllByStudentIdAndLessonCourseIdAndCompletedTrue(student.getId(), courseId);

        int completedLessons = completedProgresses.size();
        List<Long> completedLessonIds = completedProgresses.stream()
                .map(p -> p.getLesson().getId())
                .toList();

        double rawPercentage = (totalLessons == 0) ? 0.0 : ((double) completedLessons / totalLessons) * 100.0;
        double percentage = Math.round(rawPercentage * 10.0) / 10.0;

        return new ProgressDto.CourseProgressResponse(
                courseId,
                course.getTitle(),
                totalLessons,
                completedLessons,
                percentage,
                completedLessonIds
        );
    }
}