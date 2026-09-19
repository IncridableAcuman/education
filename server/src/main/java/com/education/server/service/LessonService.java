package com.education.server.service;

import com.education.server.dto.LessonDto;
import com.education.server.entity.CourseEntity;
import com.education.server.entity.LessonEntity;
import com.education.server.entity.UserEntity;
import com.education.server.exception.CustomBadRequestException;
import com.education.server.exception.CustomNotFoundException;
import com.education.server.repository.CourseRepository;
import com.education.server.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonService {
    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public LessonDto.Response createLesson(Long courseId, LessonDto.CreateRequest request, UserEntity currentUser) {
        CourseEntity course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CustomNotFoundException("Kurs topilmadi: " + courseId));

        if (!course.getTeacher().getId().equals(currentUser.getId())) {
            throw new CustomBadRequestException("Faqat ushbu kurs egasi dars qo'sha oladi");
        }

        LessonEntity lesson = LessonEntity.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .videoUrl(request.getVideoUrl())
                .orderNumber(request.getOrderNumber())
                .course(course)
                .build();

        return LessonDto.Response.from(lessonRepository.save(lesson));
    }

    @Transactional(readOnly = true)
    public List<LessonDto.Response> getCourseLessons(Long courseId) {
        return lessonRepository.findAllByCourseIdOrderByOrderNumberAsc(courseId).stream()
                .map(LessonDto.Response::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public LessonDto.Response getLessonById(Long id) {
        LessonEntity lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new CustomNotFoundException("Dars topilmadi: " + id));
        return LessonDto.Response.from(lesson);
    }

    @Transactional
    public LessonDto.Response updateLesson(Long id, LessonDto.UpdateRequest request, UserEntity currentUser) {
        LessonEntity lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new CustomNotFoundException("Dars topilmadi: " + id));

        if (!lesson.getCourse().getTeacher().getId().equals(currentUser.getId())) {
            throw new CustomBadRequestException("Faqat ushbu kurs egasi darsni tahrirlashi mumkin");
        }

        lesson.setTitle(request.getTitle());
        lesson.setContent(request.getContent());
        lesson.setVideoUrl(request.getVideoUrl());
        lesson.setOrderNumber(request.getOrderNumber());

        return LessonDto.Response.from(lessonRepository.save(lesson));
    }

    @Transactional
    public void deleteLesson(Long id, UserEntity currentUser) {
        LessonEntity lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new CustomNotFoundException("Dars topilmadi: " + id));

        if (!lesson.getCourse().getTeacher().getId().equals(currentUser.getId())) {
            throw new CustomBadRequestException("Faqat ushbu kurs egasi darsni o'chira oladi");
        }

        lessonRepository.delete(lesson);
    }
}